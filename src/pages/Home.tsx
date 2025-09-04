import React, { useState } from "react";
import { shortenUrl } from "../api/urlShortener";

const Home: React.FC = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setShortUrl(null);
    setLoading(true);
    try {
      const result = await shortenUrl(longUrl);
      setShortUrl(result);
    } catch (err: any) {
      setError(err.message || "Failed to shorten URL");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl);
      alert("Copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-600 flex flex-col items-center p-6">
      {/* Heading */}
      <h1 className="text-5xl font-extrabold text-white mt-12 text-center drop-shadow-lg">
        🔗 URL Shortener
      </h1>
      <p className="text-white/80 text-center mt-2 mb-12 text-lg">
        Paste your long URL and get a short, shareable link instantly.
      </p>

      {/* Input Card */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-2xl">
        <form onSubmit={handleShorten} className="flex flex-col sm:flex-row gap-4">
          <input
            type="url"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="https://example.com"
            className="flex-1 px-5 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 placeholder-gray-400 text-lg"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-4 rounded-xl font-semibold bg-indigo-600 text-white text-lg hover:bg-indigo-700 disabled:bg-gray-400 transition-all"
          >
            {loading ? "Shortening..." : "Shorten"}
          </button>
        </form>

        {/* Shortened URL */}
        {shortUrl && (
          <div className="mt-6 bg-indigo-50 border border-indigo-200 p-4 rounded-xl flex items-center justify-between">
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-700 font-medium truncate underline"
              title={shortUrl}
            >
              {shortUrl}
            </a>
            <button
              onClick={copyToClipboard}
              className="ml-4 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-all"
            >
              Copy
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-6 bg-red-50 border border-red-200 p-4 rounded-xl">
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <p className="mt-12 text-white/70 text-center">
        Powered by TinyURL API
      </p>
    </div>
  );
};

export default Home;
