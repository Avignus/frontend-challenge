import { useState, useCallback, useEffect } from "react";
import { useMovieSearch } from "./useMovieSearch";
import type { MovieSearchResult } from "@/types/movie";

interface UseInfiniteMovieSearchParams {
  query: string;
}

export function useInfiniteMovieSearch({ query }: UseInfiniteMovieSearchParams) {
  const [allPages, setAllPages] = useState<MovieSearchResult[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [previousQuery, setPreviousQuery] = useState(query);
  
  // Get current page data
  const { data, isLoading, isError, error } = useMovieSearch({
    query,
    page: currentPage,
  });

  // Reset when query changes
  const reset = useCallback(() => {
    setAllPages([]);
    setCurrentPage(1);
    setHasInitialized(false);
  }, []);

  // Handle query changes
  useEffect(() => {
    if (query !== previousQuery) {
      reset();
      setPreviousQuery(query);
    }
  }, [query, previousQuery, reset]);

  // Load next page
  const loadMore = useCallback(() => {
    if (!isLoading && currentPage > 0) {
      setCurrentPage(prev => prev + 1);
    }
  }, [isLoading, currentPage]);

  // Update movies when data arrives
  useEffect(() => {
    if (!data?.Search) return;

    if (currentPage === 1) {
      // Always set movies for page 1 (initial load or reset)
      setAllPages(data.Search);
      setHasInitialized(true);
    } else if (currentPage > 1 && hasInitialized) {
      // Append new page data with deduplication
      setAllPages(prev => {
        const existingIds = new Set(prev.map(movie => movie.imdbID));
        const newMovies = data.Search!.filter(movie => !existingIds.has(movie.imdbID));
        return [...prev, ...newMovies];
      });
    }
  }, [data, currentPage, hasInitialized]);

  const totalResults = data?.totalResults ? parseInt(data.totalResults, 10) : 0;
  const hasNextPage = hasInitialized && allPages.length < totalResults && totalResults > 0;

  return {
    movies: allPages,
    isLoading: isLoading && !hasInitialized,
    isError,
    error,
    hasNextPage,
    loadMore,
    reset,
  };
}
