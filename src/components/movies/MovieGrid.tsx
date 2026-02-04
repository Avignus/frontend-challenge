import { MovieCard, Movie } from "./MovieCard";

interface MovieGridProps {
  movies: Movie[];
  title?: string;
  isLoading?: boolean;
  error?: string | null;
  emptyMessage?: string;
}

export function MovieGrid({
  movies,
  title,
  isLoading = false,
  error = null,
  emptyMessage = "No movies found",
}: MovieGridProps) {
  // Loading State
  if (isLoading) {
    return (
      <div className="w-full">
        {title && (
          <div className="h-8 w-48 bg-white/10 rounded-lg animate-pulse mb-6" />
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[2/3] bg-white/10 rounded-xl" />
              <div className="mt-3 h-4 bg-white/10 rounded w-3/4" />
              <div className="mt-2 h-3 bg-white/10 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="w-full py-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-4">
          <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-red-400 text-lg font-medium">Something went wrong</p>
        <p className="text-gray-500 mt-1">{error}</p>
      </div>
    );
  }

  // Empty State
  if (movies.length === 0) {
    return (
      <div className="w-full py-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
          </svg>
        </div>
        <p className="text-gray-400 text-lg">{emptyMessage}</p>
      </div>
    );
  }

  // Results Grid
  return (
    <div className="w-full">
      {title && (
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-white">{title}</h2>
          <span className="text-sm text-gray-400">{movies.length} results</span>
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

