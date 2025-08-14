import { useState } from "react";

type Props = {
  onSearch: (q: string) => void;
  placeholder?: string;
};

export default function SearchBar({ onSearch, placeholder }: Props) {
  const [q, setQ] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(q.trim());
      }}
      className="relative flex items-center"
    >
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder ?? "Search city (e.g., Yangon)"}
        className="w-full px-5 py-3 pr-14 text-gray-700 bg-white rounded-lg shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
      />
      <button
        type="submit"
        className="absolute right-0 top-0 h-full px-4 text-gray-500 hover:text-blue-600 transition-colors duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </form>
  );
}
