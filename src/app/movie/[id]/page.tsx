"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { useMovieDetails } from "@/hooks/useMovieDetails";
import { MovieDetails } from "@/components/movie/MovieDetails";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function MovieDetailsPage() {
  const params = useParams();
  const imdbId = params.id as string;
  
  const { data: movie, isLoading, isError, error } = useMovieDetails(imdbId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
      <Header />

      <main className="flex-1 relative">
        {/* Loading State */}
        {isLoading && (
          <div className="min-h-[60vh] flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-400 animate-pulse">Loading movie details...</p>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4 text-center">
             <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-2">
                <AlertCircle className="w-8 h-8 text-red-400" />
             </div>
            <h2 className="text-xl font-bold text-white">Oops! Something went wrong</h2>
            <p className="text-red-400 max-w-md">
              {error instanceof Error ? error.message : "Failed to load movie details"}
            </p>
            <Link 
              href="/" 
              className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/10"
            >
              Back to Home
            </Link>
          </div>
        )}

        {/* Success State */}
        {!isLoading && !isError && movie && (
          <div className="py-8 md:py-12">
            <MovieDetails movie={movie} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
