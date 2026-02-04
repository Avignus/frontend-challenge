"use client";

import { useEffect, useCallback } from "react";
import { MovieCard } from "./MovieCard";
import type { MovieSearchResult } from "@/types/movie";

interface InfiniteScrollResultsProps {
  movies: MovieSearchResult[];
  isLoading: boolean;
  hasNextPage: boolean;
  onLoadMore: () => void;
}

export function InfiniteScrollResults({ 
  movies, 
  isLoading, 
  hasNextPage, 
  onLoadMore 
}: InfiniteScrollResultsProps) {
  const handleScroll = useCallback(() => {
    // Use threshold for better UX
    const threshold = 100; // 100px from bottom
    const scrollPosition = window.innerHeight + document.documentElement.scrollTop;
    const totalHeight = document.documentElement.scrollHeight;
    
    // If not near bottom or already loading, return
    if (scrollPosition < totalHeight - threshold || isLoading || !hasNextPage) {
      return;
    }

    // Load next page
    onLoadMore();
  }, [isLoading, hasNextPage, onLoadMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      
      {/* Loading indicator */}
      {isLoading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full" />
        </div>
      )}
      
      {/* No more results */}
      {!hasNextPage && movies.length > 0 && (
        <div className="text-center py-8 text-gray-500">
          No more movies to load
        </div>
      )}
    </div>
  );
}
