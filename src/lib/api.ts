import { searchMoviesWithFallback } from "./api/moviesWithFallback";
import type { MovieSearchResult } from "@/types/movie";

export interface Movie {
  id: string;
  title: string;
  year: number;
  poster?: string;
  rating?: number;
}

export interface SearchResponse {
  results: Movie[];
  total: number;
  page: number;
  totalPages: number;
}

function mapToMovie(result: MovieSearchResult): Movie {
  return {
    id: result.id,
    title: result.primaryTitle || result.originalTitle || "Untitled",
    year: result.startYear ?? 0,
    poster: result.primaryImage?.url,
    rating: result.imdbRating,
  };
}

export async function searchMovies(
  query: string,
  page = 1
): Promise<SearchResponse> {
  const raw = await searchMoviesWithFallback(query, page);

  const total = raw.totalCount ?? raw.titles.length;
  const results = raw.titles.map(mapToMovie);
  const perPage = results.length || 10;
  const totalPages = perPage > 0 ? Math.ceil(total / perPage) : 1;

  return {
    results,
    total,
    page,
    totalPages,
  };
}

export async function getPopularMovies(
  page = 1
): Promise<SearchResponse> {
  // Popular movies are just search with an empty query in the existing API
  return searchMovies("", page);
}

