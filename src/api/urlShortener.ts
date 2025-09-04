import type { ShortenResponse } from "../types";

export async function shortenUrl(longUrl: string): Promise<string> {
  const response = await fetch(
    `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`
  );
  if (!response.ok) throw new Error("Failed to shorten");
  return await response.text();
}

