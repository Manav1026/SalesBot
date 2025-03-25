"use client";

import { useState } from "react";

export default function InterviewButton() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const startPhoneCall = async () => {
    if (!phoneNumber) {
      alert("Please enter a phone number");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/startInterview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (data.error) {
        alert(`Error: ${data.error}`);
      } else {
        alert("Phone call started successfully!");
      }
    } catch (error) {
      console.error("Error starting phone call:", error);
      alert("Failed to start phone call");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold">📞 SalesBot Phone Interview</h2>
      <input
        type="tel"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Enter your phone number"
        className="mt-2 p-2 border rounded"
      />
      <button
        onClick={startPhoneCall}
        disabled={loading}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        {loading ? "Calling..." : "Start Phone Interview 📞"}
      </button>
    </div>
  );
}
