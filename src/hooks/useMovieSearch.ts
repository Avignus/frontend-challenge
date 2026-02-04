"use client";

import { useState, useCallback, useEffect } from "react";
import { Movie } from "@/components/movies/MovieCard";

const API_BASE_URL = "https://api.imdbapi.dev";

interface UseMovieSearchReturn {
  results: Movie[];
  isLoading: boolean;
  error: string | null;
  hasSearched: boolean;
  searchQuery: string;
  search: (query: string) => Promise<void>;
  loadPopular: () => Promise<void>;
  clear: () => void;
}

export function useMovieSearch(): UseMovieSearchReturn {
  const [results, setResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const search = useCallback(async (query: string) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    setSearchQuery(query);

    try {
      // According to imdb.yaml: /search/titles has query (required) and limit (optional, max 50)
      const searchParams = new URLSearchParams({ 
        query: query.trim(),
        limit: "50", // Maximum allowed by API spec
      });
      const response = await fetch(
        `${API_BASE_URL}/search/titles?${searchParams.toString()}`,
        { headers: { accept: "application/json" } }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      // According to imdb.yaml: imdbapiSearchTitlesResponse has 'titles' array
      const allTitles = data.titles || [];

      const movies: Movie[] = allTitles.map((title: any) => ({
        id: title.id || "",
        title: title.primaryTitle || title.originalTitle || "Untitled",
        year: title.startYear,
        poster: title.primaryImage?.url,
        // According to imdb.yaml: rating is an object with aggregateRating and voteCount
        rating: title.rating?.aggregateRating,
        type: title.type,
      }));

      setResults(movies);
    } catch (err) {
      console.error("Search failed:", err);
      setError(err instanceof Error ? err.message : "Failed to search");
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadPopular = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setHasSearched(false);
    setSearchQuery("");

    try {
      // According to imdb.yaml: /titles endpoint uses types, sortBy, sortOrder, pageToken
      // Note: pageSize is not in the spec, but we can limit results client-side
      const params = new URLSearchParams({
        types: "MOVIE",
        sortBy: "SORT_BY_POPULARITY",
        sortOrder: "DESC",
      });

      const response = await fetch(`${API_BASE_URL}/titles?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      // According to imdb.yaml: imdbapiListTitlesResponse has 'titles' array
      const allTitles = data.titles || [];
      // Limit to 50 results client-side since API doesn't have pageSize
      const limitedTitles = allTitles.slice(0, 50);

      const movies: Movie[] = limitedTitles.map((title: any) => ({
        id: title.id || "",
        title: title.primaryTitle || title.originalTitle || "Untitled",
        year: title.startYear,
        poster: title.primaryImage?.url,
        // According to imdb.yaml: rating is an object with aggregateRating and voteCount
        rating: title.rating?.aggregateRating,
        type: title.type,
      }));

      setResults(movies);
    } catch (err) {
      console.error("Failed to load popular:", err);
      setError(err instanceof Error ? err.message : "Failed to load movies");
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clear = useCallback(() => {
    setResults([]);
    setError(null);
    setHasSearched(false);
    setSearchQuery("");
    loadPopular();
  }, [loadPopular]);

  // Load popular movies on mount
  useEffect(() => {
    loadPopular();
  }, [loadPopular]);

  return {
    results,
    isLoading,
    error,
    hasSearched,
    searchQuery,
    search,
    loadPopular,
    clear,
  };
}
