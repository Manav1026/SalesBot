"use client";

import { useEffect, useState } from "react";

export default function ResultsPage() {
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch("/api/getResult");
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    fetchResults();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Interview Results</h2>
      {results.length === 0 ? (
        <p>No results available.</p>
      ) : (
        <div className="space-y-4">
          {results.map((result, index) => (
            <div key={index} className="p-4 border rounded-lg shadow">
              <p className="text-lg font-semibold">User ID: {result.userId}</p>
              <p className="text-gray-700">Transcript: {result.transcript}</p>
              <p className="text-gray-800">
                Scores: {JSON.stringify(result.scores)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
