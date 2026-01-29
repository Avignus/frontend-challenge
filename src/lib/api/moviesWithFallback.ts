import { mockSearchMovies, mockGetMovieDetails } from "./mockData";
import { searchMovies, getMovieDetails } from "./movies";
import type { MovieSearchResponse, MovieDetails } from "@/types/movie";

// Check if we should use mock data (no API key or explicitly set)
const USE_MOCK_API = !process.env.NEXT_PUBLIC_OMDB_API_KEY || process.env.NEXT_PUBLIC_USE_MOCK_API === "true";

export async function searchMoviesWithFallback(
  query: string,
  page: number = 1
): Promise<MovieSearchResponse> {
  if (USE_MOCK_API) {
    // Add artificial delay to simulate network request
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockSearchMovies(query, page);
  }
  
  try {
    return await searchMovies(query, page);
  } catch (error) {
    console.warn("API failed, falling back to mock data:", error);
    // Fallback to mock data if API fails
    return mockSearchMovies(query, page);
  }
}

export async function getMovieDetailsWithFallback(imdbId: string): Promise<MovieDetails> {
  if (USE_MOCK_API) {
    // Add artificial delay to simulate network request
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockGetMovieDetails(imdbId);
  }
  
  try {
    return await getMovieDetails(imdbId);
  } catch (error) {
    console.warn("API failed, falling back to mock data:", error);
    // Fallback to mock data if API fails
    return mockGetMovieDetails(imdbId);
  }
}
