import { useQuery } from "@tanstack/react-query";
import { searchMoviesWithFallback } from "@/lib/api/moviesWithFallback";
import type { MovieSearchResponse } from "@/types/movie";

interface UseMovieSearchParams {
  query: string;
  page: number;
}

export function useMovieSearch({ query, page }: UseMovieSearchParams) {
  console.log("🎬 useMovieSearch called with:", { query, page });
  
  return useQuery<MovieSearchResponse>({
    queryKey: ["movies", query, page],
    queryFn: () => {
      console.log("🚀 queryFn executing for:", { query, page });
      return searchMoviesWithFallback(query, page);
    },
    enabled: true, // Always enabled to show popular movies even with empty query
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 2,
    placeholderData: (previousData) => previousData,
  });
}
