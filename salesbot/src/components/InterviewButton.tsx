"use client";

import { useEffect, useState } from "react";
import { NextResponse } from "next/server";

export default function InterviewButton() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [listenUrl, setListenUrl] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  // 📞 Start Phone Call
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
      console.log("📡 API Response:", data);

      if (data.error) {
        alert(`Error: ${data.error}`);
      } else {
        alert("✅ Phone call started successfully!");
        setListenUrl(data.listenUrl);
      }
    } catch (error) {
      console.error("❌ Error starting phone call:", error);
      alert("Failed to start phone call");
    } finally {
      setLoading(false);
    }
  };

  // 🔄 WebSocket Connection
  useEffect(() => {
    if (!listenUrl) {
      console.error("❌ No WebSocket URL received, skipping connection.");
      return;
    }

    console.log("🌐 Connecting to WebSocket:", listenUrl);

    try {
      const ws = new WebSocket(listenUrl);

      ws.onopen = () => console.log("✅ WebSocket connected.");

      ws.onerror = (error) => {
        console.error("❌ WebSocket Error:", error);
        setLogs((prevLogs) => [...prevLogs, "❌ WebSocket connection failed."]);
      };

      ws.onclose = (event) => {
        console.log("🔌 WebSocket closed:", event.code, event.reason);
        setLogs((prevLogs) => [...prevLogs, "🔌 WebSocket disconnected."]);
      };

      ws.onmessage = async (event) => {
        console.log("📩 Incoming Message:", event.data);
      };

      return () => {
        console.log("🧹 Cleaning up WebSocket...");
        ws.close();
      };
    } catch (err) {
      console.error("❌ WebSocket connection error:", err);
    }
  }, [listenUrl]);

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
      <div className="mt-6 w-full p-4 border rounded-lg bg-gray-100">
        <h3 className="text-lg font-bold">📡 Live Call Logs</h3>
        <div className="max-h-60 overflow-auto">
          {logs.length ? (
            logs.map((log, index) => (
              <div key={index} className="p-2 border-b">
                <pre className="text-sm">{log}</pre>
              </div>
            ))
          ) : (
            <p>Waiting for logs...</p>
          )}
        </div>
      </div>
    </div>
  );
}
