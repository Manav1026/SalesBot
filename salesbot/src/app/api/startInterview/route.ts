import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { phoneNumber } = await req.json();
    const vapiAPIKey = process.env.VAPI_PRIVATE_KEY;
    const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;

    if (!phoneNumber || !assistantId || !vapiAPIKey) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const credentialUrl = "https://api.vapi.ai/credential";
    const credentialBody = {
      provider: "byo-sip-trunk",
      name: "Twilio Trunk",
      gateways: [{ ip: "vapi-sip-manav.pstn.ashburn.twilio.com" }],
      outboundLeadingPlusEnabled: true,
    };

    const credResponse = await fetch(credentialUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${vapiAPIKey}`,
      },
      body: JSON.stringify(credentialBody),
    });

    const credData = await credResponse.json();
    console.log("Twilio Credential Response:", credData);

    if (!credData.id) {
      return NextResponse.json(
        { error: "Failed to create credential" },
        { status: 500 }
      );
    }

    const registerPhoneNumberUrl = "https://api.vapi.ai/phone-number";
    const registerPhoneNumberBody = {
      provider: "byo-phone-number",
      name: "Twilio SIP Number",
      number: "+18555132973",
      numberE164CheckEnabled: false,
      credentialId: credData.id,
    };

    const registerPhoneNumberResponse = await fetch(registerPhoneNumberUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${vapiAPIKey}`,
      },
      body: JSON.stringify(registerPhoneNumberBody),
    });

    const registerPhoneNumberData = await registerPhoneNumberResponse.json();
    console.log("🔹 Registered Phone Response:", registerPhoneNumberData);

    if (!registerPhoneNumberData.id) {
      return NextResponse.json(
        { error: "Phone number registration failed" },
        { status: 500 }
      );
    }

    const vapiURL = "https://api.vapi.ai/call/phone";
    const payload = {
      assistantId,
      customer: {
        number: phoneNumber,
        numberE164CheckEnabled: false,
      },
      phoneNumberId: registerPhoneNumberData.id,
    };

    console.log("📡 Sending request to Vapi API:", payload);
    const response = await fetch(vapiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${vapiAPIKey}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log("Vapi API Response:", JSON.stringify(data, null, 2));

    if (data.error) {
      return NextResponse.json({ error: data.error }, { status: 500 });
    }

    if (!data.monitor?.listenUrl) {
      return NextResponse.json(
        { error: "No WebSocket URL in response" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      listenUrl: data.monitor.listenUrl,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
