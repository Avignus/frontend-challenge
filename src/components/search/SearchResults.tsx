import type { MovieSearchResult } from "@/types/movie";
import { MovieCard } from "./MovieCard";

interface SearchResultsProps {
  movies: MovieSearchResult[];
}

export function SearchResults({ movies }: SearchResultsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
}
