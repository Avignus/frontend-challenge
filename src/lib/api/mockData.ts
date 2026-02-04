import type { MovieSearchResponse, MovieDetails } from "@/types/movie";

// Mock movie data
const mockMovies = Array.from({ length: 100 }, (_, i) => {
  const posterIndex = (i % 3) + 1;
  return {
    id: `tt${String(i + 1).padStart(7, "0")}`,
    primaryTitle: `Mock Movie ${i + 1}`,
    originalTitle: `Mock Movie ${i + 1}`,
    type: "movie",
    startYear: 2020 + (i % 4),
    primaryImage: {
      url: i % 3 === 0 ? "/placeholder-movie.svg" : `/mock-movie-${posterIndex}.svg`,
      width: 300,
      height: 450,
    },
    genres: [["Action", "Comedy", "Drama"][i % 3]],
  };
});

const mockMovieDetails: Record<string, MovieDetails> = {
  "tt0000001": {
    id: "tt0000001",
    primaryTitle: "Mock Movie 1",
    originalTitle: "Mock Movie 1",
    type: "movie",
    startYear: 2023,
    primaryImage: {
      url: "/mock-movie-1.svg",
      width: 300,
      height: 450,
    },
    genres: ["Action", "Adventure", "Sci-Fi"],
    runtimeSeconds: 7200,
    plot: "In a world where movies are mocked, one film stands above the rest. This is the story of that film, its struggles, and its ultimate triumph over adversity.",
    directors: [{ id: "nm0000001", displayName: "John Director" }],
    writers: [{ id: "nm0000002", displayName: "Jane Writer" }],
    stars: [
      { id: "nm0000003", displayName: "Actor One" },
      { id: "nm0000004", displayName: "Actress Two" },
      { id: "nm0000005", displayName: "Supporting Actor" }
    ],
    rating: { aggregateRating: 7.8, voteCount: 125432 },
  },
};

export function mockSearchMovies(query: string, page: number = 1): MovieSearchResponse {
  const resultsPerPage = 10;
  const startIndex = (page - 1) * resultsPerPage;
  
  // Filter movies based on query
  const filteredMovies = query
    ? mockMovies.filter(movie => 
        movie.primaryTitle.toLowerCase().includes(query.toLowerCase()) ||
        movie.startYear.toString().includes(query)
      )
    : mockMovies;
  
  const endIndex = startIndex + resultsPerPage;
  const paginatedResults = filteredMovies.slice(startIndex, endIndex);
  
  return {
    titles: paginatedResults,
    totalCount: filteredMovies.length,
  };
}

export function mockGetMovieDetails(imdbId: string): MovieDetails {
  // Return detailed movie if exists, otherwise create a basic version
  if (mockMovieDetails[imdbId]) {
    return mockMovieDetails[imdbId];
  }
  
  const movieIndex = parseInt(imdbId.replace("tt", ""), 10) - 1;
  const baseMovie = mockMovies[movieIndex] || mockMovies[0];
  
  return {
    id: baseMovie.id,
    primaryTitle: baseMovie.primaryTitle,
    originalTitle: baseMovie.originalTitle,
    type: baseMovie.type,
    startYear: baseMovie.startYear,
    primaryImage: baseMovie.primaryImage,
    genres: baseMovie.genres,
    runtimeSeconds: 7200,
    plot: `This is the detailed plot for ${baseMovie.primaryTitle}. In a world where movies are mocked, this film tells an extraordinary story that captivates audiences worldwide.`,
    directors: [{ id: "nm0000001", displayName: "John Director" }],
    writers: [{ id: "nm0000002", displayName: "Jane Writer" }],
    stars: [
      { id: "nm0000003", displayName: "Actor One" },
      { id: "nm0000004", displayName: "Actress Two" },
      { id: "nm0000005", displayName: "Supporting Actor" }
    ],
    rating: { aggregateRating: 7.8, voteCount: 125432 },
  };
}
