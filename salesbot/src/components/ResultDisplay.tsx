"use client";
import { useEffect, useState } from "react";

interface InterviewResult {
  id: string;
  transcript: string;
  clarity: number;
  relevance: number;
  persuasiveness: number;
}

export default function ResultsDisplay() {
  const [data, setData] = useState<InterviewResult[] | null>(null);

  useEffect(() => {
    fetch("/api/getResults")
      .then((res) => res.json())
      .then((data: InterviewResult[]) => setData(data));
  }, []);

  if (!data) return <h2>Loading...</h2>;

  return (
    <div className="max-w-2xl mx-auto p-5">
      <h2 className="text-2xl font-bold">Interview Results</h2>
      {data.map((result) => (
        <div key={result.id} className="border p-4 rounded mb-3">
          <p>
            <strong>Transcript:</strong> {result.transcript}
          </p>
          <p>
            <strong>Clarity:</strong> {result.clarity}
          </p>
          <p>
            <strong>Relevance:</strong> {result.relevance}
          </p>
          <p>
            <strong>Persuasiveness:</strong> {result.persuasiveness}
          </p>
        </div>
      ))}
    </div>
  );
}
