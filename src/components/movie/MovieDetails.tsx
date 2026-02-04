import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Star, FileText, ImageIcon } from "lucide-react";
import type { MovieDetails as MovieDetailsType } from "@/types/movie";

interface MovieDetailsProps {
  movie: MovieDetailsType;
}

const FALLBACK_POSTER = "/placeholder-movie.svg";

function formatRuntime(seconds?: number): string {
  if (!seconds) return "";
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

export function MovieDetails({ movie }: MovieDetailsProps) {
  const posterSrc = movie.primaryImage?.url || FALLBACK_POSTER;
  // According to imdb.yaml: only runtimeSeconds is available, not runtimeStr
  const runtime = formatRuntime(movie.runtimeSeconds);

  return (
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
      {/* Background Glow Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
          Back to Search
        </Link>
      </div>

      {/* Main Card */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        <div className="md:flex">
          {/* Poster Section */}
          <div className="md:w-[400px] md:shrink-0 relative">
             {/* Mobile: Aspect Ratio / Desktop: Full height of container */}
            <div className="aspect-[2/3] md:h-full relative bg-slate-800">
              {movie.primaryImage?.url ? (
                <Image
                  src={posterSrc}
                  alt={movie.primaryTitle}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-600">
                  <ImageIcon className="w-20 h-20" />
                </div>
              )}
              {/* Gradient overlay for poster */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/60" />
            </div>
          </div>

          {/* Details Section */}
          <div className="p-6 md:p-10 flex-1 flex flex-col">
            <div className="mb-6">
              {/* Header Info */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-2 text-sm md:text-base font-medium text-purple-400">
                {movie.type && <span className="uppercase tracking-wider">{movie.type}</span>}
                {movie.startYear && (
                  <>
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-300">{movie.startYear}</span>
                  </>
                )}
                {runtime && (
                  <>
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-300">{runtime}</span>
                  </>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 leading-tight">
                {movie.primaryTitle}
              </h1>
              
              {movie.originalTitle && movie.originalTitle !== movie.primaryTitle && (
                <p className="text-lg text-gray-500 italic">
                  Original title: {movie.originalTitle}
                </p>
              )}
            </div>

            {/* Rating & Genres */}
            <div className="flex flex-wrap items-center gap-6 mb-8">
              {movie.rating?.aggregateRating && (
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-12 h-12 bg-yellow-500/20 rounded-full border border-yellow-500/50">
                    <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">
                      {movie.rating.aggregateRating.toFixed(1)}
                      <span className="text-lg text-gray-500 font-normal">/10</span>
                    </div>
                    {movie.rating.voteCount && (
                      <div className="text-xs text-gray-400">
                        {movie.rating.voteCount.toLocaleString()} votes
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Vertical Divider */}
              <div className="hidden sm:block w-px h-12 bg-white/10" />

              {/* Genres */}
              <div className="flex flex-wrap gap-2">
                {movie.genres?.map((genre, index) => (
                  <span
                    key={index}
                    className="px-4 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm text-gray-300 transition-colors cursor-default"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            {/* Plot */}
            {movie.plot && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-500" />
                  Plot Summary
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed font-light">
                  {movie.plot}
                </p>
              </div>
            )}

            {/* Credits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-8 border-t border-white/10 mt-auto">
              {/* Directors */}
              {movie.directors && movie.directors.length > 0 && (
                <div>
                  <span className="block text-sm text-gray-500 uppercase tracking-wider mb-2">Director</span>
                  <div className="flex flex-wrap gap-2">
                    {movie.directors.map((d, i) => (
                      <span key={i} className="text-white font-medium hover:text-purple-400 transition-colors">
                        {d.displayName}{i < (movie.directors?.length || 0) - 1 ? "," : ""}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Stars */}
              {movie.stars && movie.stars.length > 0 && (
                <div>
                  <span className="block text-sm text-gray-500 uppercase tracking-wider mb-2">Starring</span>
                  <div className="flex flex-wrap gap-x-2 gap-y-1">
                    {movie.stars.map((s, i) => (
                      <span key={i} className="text-gray-300 hover:text-white transition-colors">
                        {s.displayName}{i < (movie.stars?.length || 0) - 1 ? "," : ""}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Writers */}
              {movie.writers && movie.writers.length > 0 && (
                <div>
                  <span className="block text-sm text-gray-500 uppercase tracking-wider mb-2">Writers</span>
                  <p className="text-gray-400 text-sm">
                    {movie.writers.map((w) => w.displayName).join(", ")}
                  </p>
                </div>
              )}

              {/* Languages/Countries */}
              {(movie.originCountries?.length || 0) > 0 && (
                 <div>
                    <span className="block text-sm text-gray-500 uppercase tracking-wider mb-2">Origin</span>
                    <p className="text-gray-400 text-sm">
                      {movie.originCountries?.map(c => c.name).join(", ")}
                      {movie.spokenLanguages && movie.spokenLanguages.length > 0 && (
                        <span className="text-gray-600"> • {movie.spokenLanguages.map(l => l.name).join(", ")}</span>
                      )}
                    </p>
                 </div>
              )}
            </div>

            {/* Interests / Tags */}
            {movie.interests && movie.interests.length > 0 && (
              <div className="pt-6 border-t border-white/10">
                <span className="text-xs text-gray-500 uppercase tracking-wider mb-3 block">Tags</span>
                <div className="flex flex-wrap gap-2">
                  {movie.interests.map((interest) => (
                    <span
                      key={interest.id}
                      className="px-2 py-1 bg-purple-500/10 text-purple-300 rounded text-xs border border-purple-500/20"
                    >
                      #{interest.name.toLowerCase().replace(/\s+/g, '')}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
