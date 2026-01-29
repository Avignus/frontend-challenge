import { apiClient } from "./client";
import type { MovieSearchResponse, MovieDetails } from "@/types/movie";

export async function searchMovies(
  query: string,
  page: number = 1,
  signal?: AbortSignal
): Promise<MovieSearchResponse> {
  const { data } = await apiClient.get<MovieSearchResponse>("", {
    params: { s: query, page },
    signal,
  });
  return data;
}

export async function getMovieDetails(
  imdbId: string,
  signal?: AbortSignal
): Promise<MovieDetails> {
  const { data } = await apiClient.get<MovieDetails>("", {
    params: { i: imdbId, plot: "full" },
    signal,
  });
  return data;
}
