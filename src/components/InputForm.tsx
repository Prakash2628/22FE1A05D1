import React, { useState } from "react";

interface InputFormProps {
  onShorten: (url: string) => void | Promise<void>;
  loading?: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onShorten, loading }) => {
  const [longUrl, setLongUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!longUrl.trim()) return;
    await onShorten(longUrl.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex gap-2">
      <input
        type="url"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        placeholder="Enter a long URL (https://...)"
        required
        className="flex-1 rounded-xl border border-gray-300 bg-white p-3 outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        disabled={loading}
        className="rounded-xl px-5 py-3 font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Shortening..." : "Shorten"}
      </button>
    </form>
  );
};

export default InputForm;
