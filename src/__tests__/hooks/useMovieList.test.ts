import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useMovieList } from "@/hooks/useMovieList";

// Mock fetch
global.fetch = vi.fn();

const mockMovieResponse = {
  results: [
    {
      id: "tt1234567",
      primaryTitle: "Test Movie",
      originalTitle: "Test Movie",
      startYear: 2023,
      primaryImage: { url: "test.jpg" },
      imdbRating: 8.5,
      type: "MOVIE",
    },
  ],
  nextPageToken: "next-page-token",
};

describe("useMovieList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockMovieResponse),
    });
  });

  it("should initialize with loading state", () => {
    const { result } = renderHook(() => useMovieList("POPULAR"));
    
    expect(result.current.isLoading).toBe(true);
    expect(result.current.movies).toEqual([]);
    expect(result.current.error).toBe(null);
    expect(result.current.page).toBe(1);
    expect(result.current.totalPages).toBe(50);
  });

  it("should fetch popular movies successfully", async () => {
    const { result } = renderHook(() => useMovieList("POPULAR"));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.imdbapi.dev/titles?limit=20&types=MOVIE&sortBy=SORT_BY_POPULARITY&sortOrder=DESC"
    );
    expect(result.current.movies).toHaveLength(1);
    expect(result.current.movies[0]).toEqual({
      id: "tt1234567",
      title: "Test Movie",
      year: 2023,
      poster: "test.jpg",
      rating: 8.5,
      type: "MOVIE",
    });
  });

  it("should fetch top rated movies with correct parameters", async () => {
    const { result } = renderHook(() => useMovieList("TOP_RATED"));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.imdbapi.dev/titles?limit=20&types=MOVIE&sortBy=SORT_BY_USER_RATING&sortOrder=DESC&minVoteCount=5000"
    );
  });

  it("should fetch upcoming movies with correct parameters", async () => {
    const { result } = renderHook(() => useMovieList("UPCOMING"));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("sortBy=SORT_BY_RELEASE_DATE&sortOrder=ASC")
    );
  });

  it("should handle API errors", async () => {
    (global.fetch as any).mockResolvedValue({
      ok: false,
      status: 400,
    });

    const { result } = renderHook(() => useMovieList("POPULAR"));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe("API error: 400");
    expect(result.current.movies).toEqual([]);
  });

  it("should handle network errors", async () => {
    (global.fetch as any).mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useMovieList("POPULAR"));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe("Network error");
  });

  it("should change page and fetch new data", async () => {
    const { result } = renderHook(() => useMovieList("POPULAR"));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Change page
    result.current.setPage(2);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });
  });

  it("should handle empty response", async () => {
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ results: [] }),
    });

    const { result } = renderHook(() => useMovieList("POPULAR"));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.movies).toEqual([]);
  });
});
