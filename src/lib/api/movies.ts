import { apiClient } from "./client";
import type { MovieSearchResponse, MovieDetails } from "@/types/movie";

export async function searchMovies(
  query: string,
  page: number = 1,
  signal?: AbortSignal
): Promise<MovieSearchResponse> {
  try {
    // If no query, return popular movies
    if (!query.trim()) {
      // According to imdb.yaml: /titles endpoint doesn't have pageSize parameter
      const { data } = await apiClient.get<MovieSearchResponse>("titles", {
        params: { 
          types: "MOVIE",
          sortBy: "SORT_BY_POPULARITY",
          sortOrder: "DESC",
        },
        signal,
      });
      
      // Limit client-side since API doesn't support pageSize
      const limitedTitles = data.titles.slice(0, 50);
      const startIndex = (page - 1) * 10;
      const endIndex = startIndex + 10;
      return {
        titles: limitedTitles.slice(startIndex, endIndex),
        totalCount: limitedTitles.length
      };
    }
    
    // According to imdb.yaml: Use /search/titles endpoint for search
    const { data: searchData } = await apiClient.get<MovieSearchResponse>("search/titles", {
      params: { 
        query: query.trim(),
      },
      signal,
    });
    
    const searchTitles = searchData.titles || [];
    
    // If no matches found, return empty instead of popular movies
    if (searchTitles.length === 0) {
      return {
        titles: [],
        totalCount: 0
      };
    }
    
    // Paginate search results
    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;
    const paginatedTitles = searchTitles.slice(startIndex, endIndex);
    
    return {
      titles: paginatedTitles,
      totalCount: searchTitles.length
    };
  } catch (error) {
    console.error("❌ IMDb API search failed:", error);
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
