import Link from "next/link";
import type { MovieSearchResult } from "@/types/movie";

interface MovieCardProps {
  movie: MovieSearchResult;
}

const FALLBACK_POSTER = "/placeholder-movie.svg"; // Add a placeholder image

export function MovieCard({ movie }: MovieCardProps) {
  const posterSrc = movie.primaryImage?.url || FALLBACK_POSTER;
  const title = movie.primaryTitle || movie.originalTitle || "Untitled";

  return (
    <Link
      href={`/movie/${movie.id}`}
      className="group block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      role="article"
      aria-label={`View details for ${title} (${movie.startYear})`}
    >
      <div className="relative aspect-[2/3] bg-gray-100">
        <img
          src={posterSrc}
          alt={`${title} movie poster`}
          className="object-cover transition-transform duration-300 group-hover:scale-110 w-full h-full"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = FALLBACK_POSTER;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          {title}
        </h3>
        <p className="text-gray-600 text-xs">{movie.startYear}</p>
      </div>
    </Link>
  );
}
