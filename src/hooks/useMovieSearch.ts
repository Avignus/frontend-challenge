import { useQuery } from "@tanstack/react-query";
import { searchMoviesWithFallback } from "@/lib/api/moviesWithFallback";
import type { MovieSearchResponse } from "@/types/movie";

interface UseMovieSearchParams {
  query: string;
  page: number;
}

export function useMovieSearch({ query, page }: UseMovieSearchParams) {
  return useQuery<MovieSearchResponse>({
    queryKey: ["movies", query, page],
    queryFn: () => searchMoviesWithFallback(query, page),
    enabled: query.trim().length >= 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 2,
    placeholderData: (previousData) => previousData,
  });
}
