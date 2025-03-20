"use client";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);

  const startInterview = async () => {
    setLoading(true);
    const res = await fetch("/api/start-interview");
    const data = await res.json();
    setLoading(false);
    alert("Interview Started! Check your phone.");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">SalesBot</h1>
      <button
        onClick={startInterview}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-5"
        disabled={loading}>
        {loading ? "Starting..." : "Start Interview"}
      </button>
    </div>
  );
}
