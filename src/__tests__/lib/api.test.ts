import { describe, it, expect, vi, beforeEach } from "vitest";
import { searchMovies, getPopularMovies, mapToMovie } from "@/lib/api";
import type { MovieSearchResult } from "@/types/movie";

// Mock the searchMoviesWithFallback function
vi.mock("@/lib/api/moviesWithFallback", () => ({
  searchMoviesWithFallback: vi.fn(),
}));

import { searchMoviesWithFallback } from "@/lib/api/moviesWithFallback";

const mockMovieSearchResult: MovieSearchResult = {
  id: "tt1234567",
  primaryTitle: "Test Movie",
  originalTitle: "Test Movie",
  type: "MOVIE",
  startYear: 2023,
  primaryImage: {
    url: "https://example.com/poster.jpg",
    width: 300,
    height: 450,
  },
  rating: { aggregateRating: 8.5, voteCount: 1000 },
};

const mockSearchResponse = {
  titles: [mockMovieSearchResult],
  totalCount: 1,
};

describe("API Utilities", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("mapToMovie", () => {
    it("should map MovieSearchResult to Movie correctly", () => {
      const result = mapToMovie(mockMovieSearchResult);

      expect(result).toEqual({
        id: "tt1234567",
        title: "Test Movie",
        year: 2023,
        poster: "https://example.com/poster.jpg",
        rating: 8.5,
      });
    });

    it("should handle missing original title", () => {
      const movieWithoutOriginalTitle = {
        ...mockMovieSearchResult,
        originalTitle: undefined,
      };

      const result = mapToMovie(movieWithoutOriginalTitle);

      expect(result.title).toBe("Test Movie");
    });

    it("should use original title when primary title is missing", () => {
      const movieWithoutPrimaryTitle = {
        ...mockMovieSearchResult,
        primaryTitle: "",
        originalTitle: "Original Title",
      };

      const result = mapToMovie(movieWithoutPrimaryTitle);

      expect(result.title).toBe("Original Title");
    });

    it("should use Untitled when both titles are missing", () => {
      const movieWithoutTitles = {
        ...mockMovieSearchResult,
        primaryTitle: "",
        originalTitle: undefined,
      };

      const result = mapToMovie(movieWithoutTitles);

      expect(result.title).toBe("Untitled");
    });

    it("should handle missing year", () => {
      const movieWithoutYear = {
        ...mockMovieSearchResult,
        startYear: undefined,
      };

      const result = mapToMovie(movieWithoutYear);

      expect(result.year).toBe(0);
    });

    it("should handle missing poster", () => {
      const movieWithoutPoster = {
        ...mockMovieSearchResult,
        primaryImage: undefined,
      };

      const result = mapToMovie(movieWithoutPoster);

      expect(result.poster).toBeUndefined();
    });

    it("should handle missing rating", () => {
      const movieWithoutRating = {
        ...mockMovieSearchResult,
        rating: undefined,
      };

      const result = mapToMovie(movieWithoutRating);

      expect(result.rating).toBeUndefined();
    });

    it("should handle rating without aggregateRating", () => {
      const movieWithoutAggregateRating = {
        ...mockMovieSearchResult,
        rating: { voteCount: 1000 },
      };

      const result = mapToMovie(movieWithoutAggregateRating);

      expect(result.rating).toBeUndefined();
    });
  });

  describe("searchMovies", () => {
    it("should search movies successfully", async () => {
      vi.mocked(searchMoviesWithFallback).mockResolvedValue(mockSearchResponse);

      const result = await searchMovies("test query", 1);

      expect(searchMoviesWithFallback).toHaveBeenCalledWith("test query", 1);
      expect(result).toEqual({
        results: [
          {
            id: "tt1234567",
            title: "Test Movie",
            year: 2023,
            poster: "https://example.com/poster.jpg",
            rating: 8.5,
          },
        ],
        total: 1,
        page: 1,
        totalPages: 1,
      });
    });

    it("should calculate totalPages correctly", async () => {
      const mockResponseWithManyMovies = {
        titles: Array(10).fill(mockMovieSearchResult),
        totalCount: 25,
      };

      vi.mocked(searchMoviesWithFallback).mockResolvedValue(mockResponseWithManyMovies);

      const result = await searchMovies("test query", 1);

      expect(result.totalPages).toBe(3); // 25 total / 10 per page = 2.5 -> 3
    });

    it("should handle empty results", async () => {
      const emptyResponse = {
        titles: [],
        totalCount: 0,
      };

      vi.mocked(searchMoviesWithFallback).mockResolvedValue(emptyResponse);

      const result = await searchMovies("no results", 1);

      expect(result.results).toEqual([]);
      expect(result.total).toBe(0);
      expect(result.totalPages).toBe(0); // 0 results = 0 pages
    });

    it("should handle missing totalCount", async () => {
      const responseWithoutTotalCount = {
        titles: [mockMovieSearchResult],
      };

      vi.mocked(searchMoviesWithFallback).mockResolvedValue(responseWithoutTotalCount);

      const result = await searchMovies("test query", 1);

      expect(result.total).toBe(1); // Falls back to titles.length
      expect(result.totalPages).toBe(1);
    });

    it("should use default page 1", async () => {
      vi.mocked(searchMoviesWithFallback).mockResolvedValue(mockSearchResponse);

      await searchMovies("test query");

      expect(searchMoviesWithFallback).toHaveBeenCalledWith("test query", 1);
    });
  });

  describe("getPopularMovies", () => {
    it("should get popular movies by calling searchMovies with empty query", async () => {
      vi.mocked(searchMoviesWithFallback).mockResolvedValue(mockSearchResponse);

      const result = await getPopularMovies(2);

      expect(searchMoviesWithFallback).toHaveBeenCalledWith("", 2);
      expect(result.page).toBe(2);
    });

    it("should use default page 1", async () => {
      vi.mocked(searchMoviesWithFallback).mockResolvedValue(mockSearchResponse);

      await getPopularMovies();

      expect(searchMoviesWithFallback).toHaveBeenCalledWith("", 1);
    });
  });
});
