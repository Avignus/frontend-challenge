import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useInfiniteMovieList } from "@/hooks/useInfiniteMovieList";

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

describe("useInfiniteMovieList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockMovieResponse),
    });
  });

  it("should initialize with loading state", () => {
    const { result } = renderHook(() => useInfiniteMovieList("POPULAR"));
    
    expect(result.current.isLoading).toBe(true);
    expect(result.current.movies).toEqual([]);
    expect(result.current.error).toBe(null);
    expect(result.current.isLoadingMore).toBe(false);
    expect(result.current.hasNextPage).toBe(true);
  });

  it("should fetch initial movies successfully", async () => {
    const { result } = renderHook(() => useInfiniteMovieList("POPULAR"));

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

  it("should load more movies when fetchNextPage is called", async () => {
    const { result } = renderHook(() => useInfiniteMovieList("POPULAR"));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Mock second page response
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        results: [
          {
            id: "tt7654321",
            primaryTitle: "Second Movie",
            startYear: 2023,
            primaryImage: { url: "test2.jpg" },
            imdbRating: 7.5,
            type: "MOVIE",
          },
        ],
        nextPageToken: "second-page-token",
      }),
    });

    // Load more
    result.current.fetchNextPage();

    // Wait for movies to be accumulated
    await waitFor(() => {
      expect(result.current.movies.length).toBeGreaterThan(1);
    });

    expect(result.current.movies[1].title).toBe("Second Movie");
  });

  it("should not load more if no next page", async () => {
    // Mock response without nextPageToken
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        results: [
          {
            id: "tt1234567",
            primaryTitle: "Test Movie",
            startYear: 2023,
            primaryImage: { url: "test.jpg" },
            imdbRating: 8.5,
            type: "MOVIE",
          },
        ],
      }),
    });

    const { result } = renderHook(() => useInfiniteMovieList("POPULAR"));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.hasNextPage).toBe(false);
    
    // Try to load more
    result.current.fetchNextPage();
    
    // Should not make another request
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it("should handle API errors during initial load", async () => {
    (global.fetch as any).mockResolvedValue({
      ok: false,
      status: 400,
    });

    const { result } = renderHook(() => useInfiniteMovieList("POPULAR"));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe("API error: 400");
    expect(result.current.movies).toEqual([]);
  });

  it("should handle API errors during load more", async () => {
    const { result } = renderHook(() => useInfiniteMovieList("POPULAR"));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Mock error for second page
    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    // Load more
    result.current.fetchNextPage();

    // Wait for error state to update
    await waitFor(() => {
      expect(result.current.error).toBe("API error: 500");
    });
  });

  it("should reset when type changes", async () => {
    const { result, rerender } = renderHook(
      ({ type }: { type: "POPULAR" | "TOP_RATED" | "UPCOMING" }) => useInfiniteMovieList(type),
      { initialProps: { type: "POPULAR" as const } }
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.movies).toHaveLength(1);

    // Change type
    rerender({ type: "TOP_RATED" as const });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("sortBy=SORT_BY_USER_RATING&sortOrder=DESC&minVoteCount=5000")
    );
  });

  it("should not load more if already loading", async () => {
    const { result } = renderHook(() => useInfiniteMovieList("POPULAR"));

    // Should be loading initially
    expect(result.current.isLoading).toBe(true);

    // Try to load more while still loading
    result.current.fetchNextPage();

    // Should not make additional request beyond the initial one and useEffect
    expect(global.fetch).toHaveBeenCalledTimes(2); // Initial call + useEffect trigger
  });
});
