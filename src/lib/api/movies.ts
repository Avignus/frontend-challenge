import { apiClient } from "./client";
import type { MovieSearchResponse, MovieDetails } from "@/types/movie";

export async function searchMovies(
  query: string,
  page: number = 1,
  signal?: AbortSignal
): Promise<MovieSearchResponse> {
  try {
    // Get popular movies from IMDb API
    const { data } = await apiClient.get<MovieSearchResponse>("titles", {
      params: { 
        types: ["MOVIE"],
        pageSize: 100, // Get more results to search through
        sortBy: "SORT_BY_POPULARITY",
        sortOrder: "DESC",
      },
      signal,
    });
    
    // If no query, return popular movies
    if (!query.trim()) {
      return {
        titles: data.titles.slice(0, 10), // Return first 10 for display
        totalCount: data.titles.length
      };
    }
    
    // Filter results based on search query
    const filteredTitles = data.titles.filter(title => 
      title.primaryTitle?.toLowerCase().includes(query.toLowerCase()) ||
      title.originalTitle?.toLowerCase().includes(query.toLowerCase())
    );
    
    return {
      titles: filteredTitles,
      totalCount: filteredTitles.length
    };
  } catch (error) {
    console.error("IMDb API search failed:", error);
    throw error; // Let the fallback handle this
  }
}

export async function getMovieDetails(
  imdbId: string,
  signal?: AbortSignal
): Promise<MovieDetails> {
  const { data } = await apiClient.get<MovieDetails>(`titles/${imdbId}`, {
    signal,
  });
  return data;
}
