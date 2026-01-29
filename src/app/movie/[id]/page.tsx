"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useMovieDetails } from "@/hooks/useMovieDetails";
import { MovieDetails as MovieDetailsComponent } from "@/components/movie/MovieDetails";

export default function MovieDetailsPage() {
  const params = useParams();
  const imdbId = params.id as string;
  
  const { data: movie, isLoading, isError, error } = useMovieDetails(imdbId);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-red-600">
          {error instanceof Error ? error.message : "Failed to load movie"}
        </p>
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to search
        </Link>
      </div>
    );
  }

  if (!movie) return null;

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 font-medium transition-colors duration-200"
        >
          ← Back to search
        </Link>

        <MovieDetailsComponent movie={movie} />
      </div>
    </main>
  );
}
