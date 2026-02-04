"use client";

import { useState, useCallback, useEffect } from "react";
import { Movie } from "@/components/movies/MovieCard";

const API_BASE_URL = "https://api.imdbapi.dev";

type ListType = "POPULAR" | "TOP_RATED" | "UPCOMING";

interface UseInfiniteMovieListReturn {
  movies: Movie[];
  isLoading: boolean;
  error: string | null;
  isLoadingMore: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
}

export function useInfiniteMovieList(type: ListType): UseInfiniteMovieListReturn {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);

  const fetchMovies = useCallback(async (isInitialLoad = true) => {
    try {
      if (isInitialLoad) {
        setIsLoading(true);
        setError(null);
      } else {
        setIsLoadingMore(true);
      }

      const params = new URLSearchParams({
        limit: "20",
        types: "MOVIE",
      });

      // Add pageToken for pagination (except for first load)
      if (!isInitialLoad && nextPageToken) {
        params.append("pageToken", nextPageToken);
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

      // Update nextPageToken
      if (data.nextPageToken) {
        setNextPageToken(data.nextPageToken);
        setHasNextPage(true);
      } else {
        setHasNextPage(false);
      }

      const mappedMovies: Movie[] = results.map((title: any) => ({
        id: title.id || "",
        title: title.primaryTitle || title.originalTitle || "Untitled",
        year: title.startYear,
        poster: title.primaryImage?.url,
        rating: title.imdbRating,
        type: title.type,
      }));

      if (isInitialLoad) {
        setMovies(mappedMovies);
      } else {
        setMovies(prev => [...prev, ...mappedMovies]);
      }
    } catch (err) {
      console.error("Failed to fetch movies:", err);
      setError(err instanceof Error ? err.message : "Failed to load movies");
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, [type, nextPageToken]);

  const fetchNextPage = useCallback(() => {
    if (hasNextPage && !isLoadingMore) {
      fetchMovies(false);
    }
  }, [hasNextPage, isLoadingMore, fetchMovies]);

  useEffect(() => {
    // Reset state when type changes
    setMovies([]);
    setNextPageToken(null);
    setHasNextPage(true);
    fetchMovies(true);
  }, [type]);

  return {
    movies,
    isLoading,
    error,
    isLoadingMore,
    hasNextPage,
    fetchNextPage,
  };
}
