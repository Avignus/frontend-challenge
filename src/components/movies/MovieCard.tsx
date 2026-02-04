import Image from "next/image";
import Link from "next/link";

export interface Movie {
  id: string;
  title: string;
  year?: number;
  poster?: string;
  rating?: number;
  type?: string;
}

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link
      href={`/movie/${movie.id}`}
      className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10"
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] bg-slate-800 overflow-hidden">
        {movie.poster ? (
          <Image
            src={movie.poster}
            alt={movie.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-600">
            <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
            </svg>
            <span className="text-xs">No Image</span>
          </div>
        )}
        
        {/* Rating Badge */}
        {movie.rating && (
          <div className="absolute top-2 right-2 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-lg flex items-center gap-1">
            <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs font-medium text-white">{movie.rating.toFixed(1)}</span>
          </div>
        )}

        {/* Type Badge */}
        {movie.type && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-purple-600/80 backdrop-blur-sm rounded-lg">
            <span className="text-xs font-medium text-white uppercase">{movie.type}</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-white truncate group-hover:text-purple-400 transition-colors">
          {movie.title}
        </h3>
        <p className="text-sm text-gray-400 mt-1">
          {movie.year || "Unknown year"}
        </p>
      </div>
    </Link>
  );
}

