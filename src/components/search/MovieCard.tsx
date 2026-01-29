import Image from "next/image";
import Link from "next/link";
import type { MovieSearchResult } from "@/types/movie";

interface MovieCardProps {
  movie: MovieSearchResult;
}

const FALLBACK_POSTER = "/placeholder-movie.svg"; // Add a placeholder image

export function MovieCard({ movie }: MovieCardProps) {
  const posterSrc = movie.Poster !== "N/A" ? movie.Poster : FALLBACK_POSTER;

  return (
    <Link
      href={`/movie/${movie.imdbID}`}
      className="group block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      role="article"
      aria-label={`View details for ${movie.Title} (${movie.Year})`}
    >
      <div className="relative aspect-[2/3] bg-gray-100">
        <Image
          src={posterSrc}
          alt={`${movie.Title} movie poster`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = FALLBACK_POSTER;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          {movie.Title}
        </h3>
        <p className="text-gray-600 text-xs">{movie.Year}</p>
      </div>
    </Link>
  );
}
