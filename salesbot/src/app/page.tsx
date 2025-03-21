"use client"; // Since we use useState (React hook)

import InterviewButton from "@/components/InterviewButton";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">SalesBot</h1>
      <p className="text-gray-600 mt-2">Your AI-powered sales interview bot</p>
      <InterviewButton />
    </div>
  );
}
