"use client";

import { useState, useCallback, FormEvent, KeyboardEvent } from "react";
import { useRecentSearches } from "@/hooks/useRecentSearches";

interface SearchInputProps {
  initialValue?: string;
  isLoading?: boolean;
  onSearch: (query: string) => void;
  onClear: () => void;
}

export function SearchInput({
  initialValue = "",
  isLoading = false,
  onSearch,
  onClear,
}: SearchInputProps) {
  const [inputValue, setInputValue] = useState(initialValue);
  const [showRecent, setShowRecent] = useState(false);
  const { searches, addSearch } = useRecentSearches(5);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const query = inputValue.trim();

      if (query.length >= 2) {
        addSearch(query);
        setShowRecent(false);
        onSearch(query);
      }
    },
    [inputValue, addSearch, onSearch]
  );

  const handleClear = useCallback(() => {
    setInputValue("");
    onClear();
  }, [onClear]);

  const handleRecentClick = useCallback(
    (query: string) => {
      setInputValue(query);
      addSearch(query);
      setShowRecent(false);
      onSearch(query);
    },
    [addSearch, onSearch]
  );

  const handleSuggestionClick = useCallback(
    (term: string) => {
      setInputValue(term);
      addSearch(term);
      onSearch(term);
    },
    [addSearch, onSearch]
  );

  const handleFocus = useCallback(() => {
    setShowRecent(true);
  }, []);

  const handleBlur = useCallback(() => {
    setTimeout(() => setShowRecent(false), 200);
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setShowRecent(false);
      (e.target as HTMLInputElement).blur();
    }
  }, []);

  const suggestions = ["Batman", "Inception", "The Office", "Breaking Bad"];

  return (
    <div className="w-full">
      {/* Search Form */}
      <div className="relative">
        <form onSubmit={handleSubmit} className="flex gap-2 w-full">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              placeholder="Search movies, TV shows..."
              className="w-full pl-12 pr-4 py-4 bg-white/10 border-2 border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm transition-all"
              aria-label="Search movies"
            />
            {inputValue && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white transition"
                aria-label="Clear search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          <button
            type="submit"
            disabled={inputValue.trim().length < 2 || isLoading}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-purple-500/25"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Searching
              </span>
            ) : (
              "Search"
            )}
          </button>
        </form>

        {/* Recent Searches Dropdown */}
        {showRecent && searches.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800/95 backdrop-blur-sm border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden">
            <div className="p-3 border-b border-white/10">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Recent Searches
              </p>
            </div>
            <ul className="max-h-48 overflow-y-auto">
              {searches.map((search, index) => (
                <li key={index}>
                  <button
                    type="button"
                    onClick={() => handleRecentClick(search)}
                    className="w-full px-4 py-3 text-left hover:bg-white/10 flex items-center gap-3 transition-colors"
                  >
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-300">{search}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Quick Suggestions */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <span className="text-gray-500 text-sm">Try:</span>
        {suggestions.map((term) => (
          <button
            key={term}
            type="button"
            onClick={() => handleSuggestionClick(term)}
            className="px-3 py-1.5 text-sm bg-white/10 hover:bg-white/20 text-gray-300 rounded-full transition-colors"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
}
