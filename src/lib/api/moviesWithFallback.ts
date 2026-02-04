import { mockSearchMovies, mockGetMovieDetails } from "./mockData";
import { searchMovies, getMovieDetails } from "./movies";
import type { MovieSearchResponse, MovieDetails } from "@/types/movie";

// Only use mock data if explicitly set (not in development by default)
const FORCE_MOCK_API = process.env.NEXT_PUBLIC_USE_MOCK_API === "true";

export async function searchMoviesWithFallback(
  query: string,
  page: number = 1
): Promise<MovieSearchResponse> {
  // Always try real API first unless explicitly forced to use mock
  if (!FORCE_MOCK_API) {
    try {
      return await searchMovies(query, page);
    } catch (error) {
      console.warn("IMDb API failed, falling back to mock data:", error);
      // Fallback to mock data if API fails
    }
  }
  
  // Use mock data (either forced or as fallback)
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
  return mockSearchMovies(query, page);
}

export async function getMovieDetailsWithFallback(imdbId: string): Promise<MovieDetails> {
  // Always try real API first unless explicitly forced to use mock
  if (!FORCE_MOCK_API) {
    try {
      return await getMovieDetails(imdbId);
    } catch (error) {
      console.warn("IMDb API failed, falling back to mock data:", error);
      // Fallback to mock data if API fails
    }
  }
  
  // Use mock data (either forced or as fallback)
  await new Promise(resolve => setTimeout(resolve, 200)); // Simulate network delay
  return mockGetMovieDetails(imdbId);
}
