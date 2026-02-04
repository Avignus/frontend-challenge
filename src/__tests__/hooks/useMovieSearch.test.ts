import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useMovieSearch } from "@/hooks/useMovieSearch";

// Mock fetch
global.fetch = vi.fn();

const mockSearchResponse = {
  titles: [
    {
      id: "tt1234567",
      primaryTitle: "Search Result Movie",
      originalTitle: "Search Result Movie",
      startYear: 2023,
      primaryImage: { url: "search.jpg" },
      rating: { aggregateRating: 8.0 },
      type: "MOVIE",
    },
  ],
};

const mockPopularResponse = {
  titles: [
    {
      id: "tt7654321",
      primaryTitle: "Popular Movie",
      originalTitle: "Popular Movie",
      startYear: 2023,
      primaryImage: { url: "popular.jpg" },
      rating: { aggregateRating: 7.5 },
      type: "MOVIE",
    },
  ],
};

describe("useMovieSearch", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockPopularResponse),
    });
  });

  it("should initialize with popular movies loading", () => {
    const { result } = renderHook(() => useMovieSearch());
    
    expect(result.current.isLoading).toBe(true);
    expect(result.current.results).toEqual([]);
    expect(result.current.error).toBe(null);
    expect(result.current.hasSearched).toBe(false);
    expect(result.current.searchQuery).toBe("");
  });

  it("should load popular movies on mount", async () => {
    const { result } = renderHook(() => useMovieSearch());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.imdbapi.dev/titles?types=MOVIE&sortBy=SORT_BY_POPULARITY&sortOrder=DESC"
    );
    expect(result.current.results).toHaveLength(1);
    expect(result.current.results[0]).toEqual({
      id: "tt7654321",
      title: "Popular Movie",
      year: 2023,
      poster: "popular.jpg",
      rating: 7.5,
      type: "MOVIE",
    });
  });

  it("should search movies successfully", async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockSearchResponse),
    });

    const { result } = renderHook(() => useMovieSearch());

    // Wait for initial load
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Clear fetch calls from initial load
    vi.clearAllMocks();

    // Perform search
    await result.current.search("test query");

    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.imdbapi.dev/search/titles?query=test+query&limit=50",
      { headers: { accept: "application/json" } }
    );
    expect(result.current.hasSearched).toBe(true);
    expect(result.current.searchQuery).toBe("test query");
    expect(result.current.results).toHaveLength(1);
    expect(result.current.results[0].title).toBe("Search Result Movie");
  });

  it("should handle search errors", async () => {
    (global.fetch as any).mockResolvedValue({
      ok: false,
      status: 400,
    });

    const { result } = renderHook(() => useMovieSearch());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await result.current.search("test query");

    expect(result.current.error).toBe("API error: 400");
    expect(result.current.results).toEqual([]);
  });

  it("should clear search and reload popular movies", async () => {
    const { result } = renderHook(() => useMovieSearch());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Perform search first
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockSearchResponse),
    });

    await result.current.search("test query");
    expect(result.current.hasSearched).toBe(true);

    // Clear fetch calls
    vi.clearAllMocks();

    // Clear search
    await result.current.clear();

    expect(result.current.hasSearched).toBe(false);
    expect(result.current.searchQuery).toBe("");
    // Should have popular movies again (from loadPopular call)
    expect(result.current.results.length).toBeGreaterThan(0);
  });

  it("should handle network errors during search", async () => {
    (global.fetch as any).mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useMovieSearch());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await result.current.search("test query");

    expect(result.current.error).toBe("Network error");
  });

  it("should handle empty search results", async () => {
    const { result } = renderHook(() => useMovieSearch());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Clear fetch calls from initial load
    vi.clearAllMocks();

    // Mock empty search response
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ titles: [] }),
    });

    await result.current.search("no results query");

    expect(result.current.results).toEqual([]);
    expect(result.current.hasSearched).toBe(true);
  });

  it("should trim search query", async () => {
    const { result } = renderHook(() => useMovieSearch());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Clear fetch calls from initial load
    vi.clearAllMocks();

    // Mock search response
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockSearchResponse),
    });

    await result.current.search("  trimmed query  ");

    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.imdbapi.dev/search/titles?query=trimmed+query&limit=50",
      { headers: { accept: "application/json" } }
    );
  });

  it("should load popular movies on demand", async () => {
    const { result } = renderHook(() => useMovieSearch());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Clear fetch calls from initial load
    vi.clearAllMocks();

    // Reset to empty state manually
    result.current.results = [];
    result.current.hasSearched = true;

    await result.current.loadPopular();

    expect(result.current.hasSearched).toBe(false);
    expect(result.current.results.length).toBeGreaterThan(0);
    expect(result.current.results[0].title).toBe("Popular Movie");
  });
});
