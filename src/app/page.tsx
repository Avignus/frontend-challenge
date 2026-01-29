"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { SearchInput } from "@/components/search/SearchInput";
import { SearchResults } from "@/components/search/SearchResults";
import { InfiniteScrollResults } from "@/components/search/InfiniteScrollResults";
import { Pagination } from "@/components/pagination/Pagination";
import { PaginationToggle } from "@/components/pagination/PaginationToggle";
import { useMovieSearch } from "@/hooks/useMovieSearch";
import { useInfiniteMovieSearch } from "@/hooks/useInfiniteMovieSearch";
import { ErrorBoundary } from "@/components/ErrorBoundary";

type PaginationMode = "traditional" | "infinite";

function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "Mock"; // Default to "Mock" to show movies
  const page = parseInt(searchParams.get("page") || "1", 10);
  const [paginationMode, setPaginationMode] = useState<PaginationMode>("traditional");

  // Traditional pagination
  const { data, isLoading, isError, error, isFetching } = useMovieSearch({
    query,
    page,
  });

  // Infinite scroll
  const {
    movies: infiniteMovies,
    isLoading: isInfiniteLoading,
    isError: isInfiniteError,
    error: infiniteError,
    hasNextPage,
    loadMore,
  } = useInfiniteMovieSearch({ query });

  const totalResults = data?.totalResults ? parseInt(data.totalResults, 10) : 0;

  return (
    <ErrorBoundary>
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Movie Search</h1>
          
          <div className="flex justify-center mb-8">
            <SearchInput initialValue={query} />
          </div>

          {/* Pagination Mode Toggle */}
          {query && data?.Search && data.Search.length > 0 && (
            <PaginationToggle 
              mode={paginationMode} 
              onModeChange={setPaginationMode} 
            />
          )}

          {/* Loading State */}
          {isLoading && !isFetching && (
            <div className="flex justify-center py-12">
              <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full" />
            </div>
          )}

          {/* Error State */}
          {(isError || isInfiniteError) && (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">
                {(error || infiniteError) instanceof Error 
                  ? (error || infiniteError)!.message 
                  : "Something went wrong"
                }
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !isError && query && (!data?.Search || data.Search.length === 0) && (
            <div className="text-center py-12">
              <p className="text-gray-500">No movies found for "{query}"</p>
              <p className="text-gray-400 text-sm mt-2">Try searching for something else</p>
            </div>
          )}

          {/* Results */}
          {data?.Search && data.Search.length > 0 && (
            <>
              <div className="relative">
                {isFetching && !isLoading && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600 animate-pulse" />
                )}
                
                {paginationMode === "traditional" ? (
                  <SearchResults movies={data.Search} />
                ) : (
                  <InfiniteScrollResults
                    movies={infiniteMovies}
                    isLoading={isInfiniteLoading}
                    hasNextPage={hasNextPage}
                    onLoadMore={loadMore}
                  />
                )}
              </div>
              
              {/* Traditional Pagination */}
              {paginationMode === "traditional" && (
                <Pagination
                  currentPage={page}
                  totalResults={totalResults}
                  query={query}
                />
              )}
            </>
          )}
        </div>
      </main>
    </ErrorBoundary>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPage />
    </Suspense>
  );
}
