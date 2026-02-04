"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Movie } from "@/components/movies/MovieCard";

const API_BASE_URL = "https://api.imdbapi.dev";

type ListType = "POPULAR" | "TOP_RATED" | "UPCOMING";

interface UseMovieListReturn {
  movies: Movie[];
  isLoading: boolean;
  error: string | null;
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

export function useMovieList(type: ListType): UseMovieListReturn {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages] = useState(50);
  const pageTokensRef = useRef<{ [key: number]: string }>({}); 

  const fetchMovies = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        limit: "20",
        types: "MOVIE",
      });

      // Use pageToken for pagination (except for first page)
      if (page > 1 && pageTokensRef.current[page - 1]) {
        params.append("pageToken", pageTokensRef.current[page - 1]);
      }

      // Adjust parameters based on list type
      switch (type) {
        case "POPULAR":
          params.append("sortBy", "SORT_BY_POPULARITY");
          params.append("sortOrder", "DESC");
          break;
        case "TOP_RATED":
          params.append("sortBy", "SORT_BY_USER_RATING");
          params.append("sortOrder", "DESC");
          // Filter out items with low vote counts to ensure quality
          params.append("minVoteCount", "5000"); 
          break;
        case "UPCOMING":
           params.append("sortBy", "SORT_BY_RELEASE_DATE");
           params.append("sortOrder", "ASC");
           break;
      }

      const response = await fetch(`${API_BASE_URL}/titles?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const results = data.results || data.titles || [];

      // Store the nextPageToken for future pagination
      if (data.nextPageToken) {
        pageTokensRef.current[page] = data.nextPageToken;
      }

      const mappedMovies: Movie[] = results.map((title: any) => ({
        id: title.id || "",
        title: title.primaryTitle || title.originalTitle || "Untitled",
        year: title.startYear,
        poster: title.primaryImage?.url,
        rating: title.imdbRating,
        type: title.type,
      }));

      setMovies(mappedMovies);
    } catch (err) {
      console.error("Failed to fetch movies:", err);
      setError(err instanceof Error ? err.message : "Failed to load movies");
    } finally {
      setIsLoading(false);
    }
  }, [type, page]);

  useEffect(() => {
    fetchMovies();
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [fetchMovies, page]);

  return {
    movies,
    isLoading,
    error,
    page,
    setPage,
    totalPages,
  };
}
