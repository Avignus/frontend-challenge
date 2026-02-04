interface HeroSectionProps {
  children: React.ReactNode;
}

export function HeroSection({ children }: HeroSectionProps) {
  return (
    <section className="relative py-16 md:py-24 px-4">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-gray-300 mb-6">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Powered by IMDb API
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
          Discover Your Next
          <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Favorite Movie
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
          Search millions of movies, TV shows, and more. Get ratings, reviews,
          and all the details you need.
        </p>

        {/* Search Input Slot */}
        <div className="max-w-2xl mx-auto">{children}</div>
      </div>
    </section>
  );
}

