import { useQuery } from "@tanstack/react-query";
import { getMovieDetailsWithFallback } from "@/lib/api/moviesWithFallback";
import type { MovieDetails } from "@/types/movie";

export function useMovieDetails(imdbId: string) {
  return useQuery<MovieDetails>({
    queryKey: ["movie", imdbId],
    queryFn: () => getMovieDetailsWithFallback(imdbId),
    enabled: !!imdbId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
    retry: 2,
  });
}
