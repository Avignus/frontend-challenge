"use client";

import { Zap, BarChart, Target } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/layout/HeroSection";
import { SearchInput } from "@/components/search/SearchInput";
import { MovieGrid } from "@/components/movies/MovieGrid";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useMovieSearch } from "@/hooks/useMovieSearch";
import { useInfiniteMovieList } from "@/hooks/useInfiniteMovieList";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

export default function HomePage() {
  const {
    results,
    isLoading,
    error,
    hasSearched,
    searchQuery,
    search,
    clear,
  } = useMovieSearch();

  const {
    movies: popularMovies,
    isLoading: popularLoading,
    error: popularError,
    isLoadingMore,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteMovieList("POPULAR");

  const { triggerRef } = useInfiniteScroll({
    hasNextPage: !hasSearched && hasNextPage,
    fetchNextPage,
  });

  const gridTitle = hasSearched
    ? `Results for "${searchQuery}"`
    : "Popular Movies";

  const emptyMessage = hasSearched
    ? `No results found for "${searchQuery}"`
    : "No movies available";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero + Search */}
        <HeroSection>
          <SearchInput
            isLoading={isLoading}
            onSearch={search}
            onClear={clear}
          />
        </HeroSection>

        {/* Stats Section */}
        <section className="border-y border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "10M+", label: "Movies & Shows" },
                { value: "500K+", label: "Reviews" },
                { value: "100K+", label: "Daily Searches" },
                { value: "4.9", label: "User Rating" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl md:text-3xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <MovieGrid
            movies={hasSearched ? results : popularMovies}
            title={gridTitle}
            isLoading={hasSearched ? isLoading : popularLoading}
            error={hasSearched ? error : popularError}
            emptyMessage={emptyMessage}
          />

          {/* Show loading spinner when loading more movies */}
          {!hasSearched && isLoadingMore && <LoadingSpinner />}

          {/* Infinite scroll trigger - hidden element that triggers loading */}
          {!hasSearched && hasNextPage && (
            <div ref={triggerRef} className="h-10" />
          )}
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-white text-center mb-12">
            Why Use MovieSearch?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Get instant results with our optimized search engine.",
              },
              {
                icon: BarChart,
                title: "Detailed Info",
                description: "Access ratings, cast, and plot summaries for every title.",
              },
              {
                icon: Target,
                title: "Accurate Results",
                description: "Powered by IMDb's comprehensive database.",
              },
            ].map((feature) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-colors"
                >
                  <IconComponent className="w-10 h-10 text-purple-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
