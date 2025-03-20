import { NextApiRequest, NextApiResponse } from "next";
import { startVapiCall } from "../../lib/vapi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  try {
    await startVapiCall();
    res.status(200).json({ success: true });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to start interview" });
  }
}
