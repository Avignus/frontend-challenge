"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MovieGrid } from "@/components/movies/MovieGrid";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useInfiniteMovieList } from "@/hooks/useInfiniteMovieList";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

export default function PopularPage() {
  const { 
    movies, 
    isLoading, 
    error, 
    isLoadingMore, 
    hasNextPage, 
    fetchNextPage 
  } = useInfiniteMovieList("POPULAR");

  const { triggerRef } = useInfiniteScroll({
    hasNextPage,
    fetchNextPage,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Trending <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Now</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Discover the most popular movies being watched right now across the globe.
              Daily updates on what's hot in theaters and streaming.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-7xl mx-auto px-4 pb-16">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 md:p-8">
            <MovieGrid 
              movies={movies} 
              isLoading={isLoading} 
              error={error}
              title="Popular Movies"
            />

            {/* Show loading spinner when loading more movies */}
            {isLoadingMore && <LoadingSpinner />}

            {/* Infinite scroll trigger - hidden element that triggers loading */}
            {hasNextPage && (
              <div ref={triggerRef} className="h-10" />
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
