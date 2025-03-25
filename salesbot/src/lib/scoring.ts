export function scoreResponse(transcript: string) {
  return {
    clarity: Math.floor(Math.random() * 5) + 1,
    relevance: Math.floor(Math.random() * 5) + 1,
    persuasiveness: Math.floor(Math.random() * 5) + 1,
  };
}
