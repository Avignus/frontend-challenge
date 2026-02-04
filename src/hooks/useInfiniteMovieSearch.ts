import { useState, useCallback } from "react";
import { useMovieSearch } from "./useMovieSearch";
import type { Movie } from "@/components/movies/MovieCard";

interface UseInfiniteMovieSearchParams {
  query: string;
}

export function useInfiniteMovieSearch({ query }: UseInfiniteMovieSearchParams) {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  
  // Use the existing useMovieSearch hook
  const { results, isLoading, error, search } = useMovieSearch();

  // Search function that accumulates results
  const searchWithAccumulation = useCallback(async (searchQuery: string) => {
    await search(searchQuery);
    setHasSearched(true);
  }, [search]);

  // Reset when query changes
  const reset = useCallback(() => {
    setAllMovies([]);
    setHasSearched(false);
  }, []);

  // Update movies when results arrive
  const updateMovies = useCallback(() => {
    if (results.length > 0) {
      if (query && hasSearched) {
        // For search results, replace all movies
        setAllMovies(results);
      } else if (!query) {
        // For popular movies, accumulate
        setAllMovies(prev => {
          const existingIds = new Set(prev.map(movie => movie.id));
          const newMovies = results.filter(movie => !existingIds.has(movie.id));
          return [...prev, ...newMovies];
        });
      }
    }
  }, [results, query, hasSearched]);

  // Load more movies (for popular movies only)
  const loadMore = useCallback(() => {
    // This would need to be implemented with pagination
    // For now, we'll just return false as there's no pagination in useMovieSearch
    return false;
  }, []);

  const hasNextPage = !query && results.length > 0; // Simplified logic

  return {
    movies: query && hasSearched ? results : allMovies,
    isLoading,
    error,
    hasNextPage,
    loadMore,
    reset,
    search: searchWithAccumulation,
  };
}
