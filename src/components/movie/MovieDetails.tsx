import Image from "next/image";
import Link from "next/link";
import type { MovieDetails } from "@/types/movie";

interface MovieDetailsProps {
  movie: MovieDetails;
}

const FALLBACK_POSTER = "/placeholder-movie.svg";

export function MovieDetails({ movie }: MovieDetailsProps) {
  const posterSrc = movie.primaryImage?.url || FALLBACK_POSTER;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/3 relative aspect-[2/3] md:aspect-auto">
          <Image
            src={posterSrc}
            alt={movie.primaryTitle}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = FALLBACK_POSTER;
            }}
          />
        </div>
        <div className="md:w-2/3 p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{movie.primaryTitle}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
            <span className="font-medium">{movie.startYear}</span>
            <span>•</span>
            <span>{movie.runtimeStr}</span>
            <span>•</span>
            <span>{movie.contentRating}</span>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Genre</h2>
            <p className="text-gray-600">{movie.genres?.join(', ')}</p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Plot</h2>
            <p className="text-gray-600 leading-relaxed">{movie.plot}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Director</h3>
              <p className="text-gray-600">{movie.directors?.join(', ')}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Actors</h3>
              <p className="text-gray-600">{movie.stars?.join(', ')}</p>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Ratings</h3>
            <div className="space-y-2">
              {movie.ratings?.map((rating, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">{rating.title}</span>
                  <span className="text-blue-600 font-semibold">{rating.rating}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-semibold text-gray-800">IMDb Rating</span>
              <p className="text-gray-600">{movie.imdbRating}</p>
            </div>
            <div>
              <span className="font-semibold text-gray-800">IMDb Votes</span>
              <p className="text-gray-600">{movie.imdbRatingCount}</p>
            </div>
            <div>
              <span className="font-semibold text-gray-800">Metascore</span>
              <p className="text-gray-600">{movie.metacriticRating}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
