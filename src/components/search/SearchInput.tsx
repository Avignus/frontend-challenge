"use client";

import { useState, useEffect, useCallback, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { useRecentSearches } from "@/hooks/useRecentSearches";

interface SearchInputProps {
  initialValue?: string;
  onSearch?: (query: string) => void;
}

export function SearchInput({ initialValue = "" }: SearchInputProps) {
  const router = useRouter();
  const [inputValue, setInputValue] = useState(initialValue);
  const [showRecent, setShowRecent] = useState(false);
  const debouncedQuery = useDebounce(inputValue, 500);
  const { searches, addSearch } = useRecentSearches(5);
  
  // Auto-search when debounced query changes
  useEffect(() => {
    if (debouncedQuery.trim().length >= 2 && debouncedQuery !== initialValue) {
      router.push(`/?q=${encodeURIComponent(debouncedQuery.trim())}&page=1`);
    }
  }, [debouncedQuery, initialValue, router]);
  
  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    if (inputValue.trim().length >= 2) {
      addSearch(inputValue.trim());
      setShowRecent(false);
      router.push(`/?q=${encodeURIComponent(inputValue.trim())}&page=1`);
    } else if (inputValue.trim().length === 0) {
      // If empty, show popular movies
      router.push("/");
    }
  }, [inputValue, router, addSearch]);

  const handleClear = useCallback(() => {
    setInputValue("");
    router.push("/");
  }, [router]);

  const handleRecentClick = useCallback((query: string) => {
    setInputValue(query);
    addSearch(query);
    setShowRecent(false);
    router.push(`/?q=${encodeURIComponent(query)}&page=1`);
  }, [router, addSearch]);

  const handleFocus = useCallback(() => {
    setShowRecent(true);
  }, []);

  const handleBlur = useCallback(() => {
    // Delay hiding to allow clicking on recent searches
    setTimeout(() => setShowRecent(false), 200);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setShowRecent(false);
      (e.target as HTMLInputElement).blur();
    }
  }, []);

  const handleRecentKeyDown = useCallback((e: React.KeyboardEvent, query: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleRecentClick(query);
    } else if (e.key === 'Escape') {
      setShowRecent(false);
    }
  }, [handleRecentClick]);

  return (
    <div className="relative w-full max-w-xl">
      <form onSubmit={handleSubmit} className="flex gap-2 w-full">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder="Search movies or browse below..."
          className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400 shadow-sm"
          aria-label="Search movies"
          role="searchbox"
          aria-expanded={showRecent && searches.length > 0}
          aria-autocomplete="list"
        />
        {inputValue && (
          <button
            type="button"
            onClick={handleClear}
            className="px-3 py-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
        <button
          type="submit"
          disabled={inputValue.trim().length < 2}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-500 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
        >
          Search
        </button>
      </form>
      
      {/* Recent Searches Dropdown */}
      {showRecent && searches.length > 0 && (
        <div 
          className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
          role="listbox"
          aria-label="Recent searches"
        >
          <div className="p-3 border-b border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Recent Searches</p>
          </div>
          <ul className="max-h-48 overflow-y-auto">
            {searches.map((search, index) => (
              <li key={index} role="option">
                <button
                  type="button"
                  onClick={() => handleRecentClick(search)}
                  onKeyDown={(e) => handleRecentKeyDown(e, search)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 flex items-center gap-3 focus:outline-none focus:bg-gray-50"
                  role="option"
                  aria-selected={false}
                >
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">{search}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
