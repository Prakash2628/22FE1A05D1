import React from "react";

interface ShortenedLinkProps {
  shortUrl: string;
}

const ShortenedLink: React.FC<ShortenedLinkProps> = ({ shortUrl }) => {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      alert("Copied!");
    } catch {
      alert("Could not copy. Select and copy manually.");
    }
  };

  return (
    <div className="mt-4 rounded-xl bg-white p-4 shadow">
      <p className="text-sm text-gray-600">Shortened Link</p>
      <div className="mt-1 flex items-center justify-between gap-3">
        <a
          href={shortUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="truncate font-semibold text-blue-700 underline"
          title={shortUrl}
        >
          {shortUrl}
        </a>
        <button
          onClick={copy}
          className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-100"
        >
          Copy
        </button>
      </div>
    </div>
  );
};

export default ShortenedLink;