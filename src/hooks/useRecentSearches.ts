import { useState, useCallback } from "react";

export function useRecentSearches(maxItems = 5) {
  const [searches, setSearches] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem("recentSearches");
    return stored ? JSON.parse(stored) : [];
  });

  const addSearch = useCallback((query: string) => {
    setSearches((prev) => {
      const filtered = prev.filter((s) => s !== query);
      const updated = [query, ...filtered].slice(0, maxItems);
      localStorage.setItem("recentSearches", JSON.stringify(updated));
      return updated;
    });
  }, [maxItems]);

  return { searches, addSearch };
}
