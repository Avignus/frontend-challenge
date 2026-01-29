import type { MovieSearchResponse, MovieDetails } from "@/types/movie";

// Mock movie data
const mockMovies = Array.from({ length: 100 }, (_, i) => {
  const posterIndex = (i % 3) + 1;
  return {
    imdbID: `tt${String(i + 1).padStart(7, "0")}`,
    Title: `Mock Movie ${i + 1}`,
    Year: `${2020 + (i % 4)}`,
    Type: "movie",
    Poster: i % 3 === 0 ? "N/A" : `/mock-movie-${posterIndex}.svg`,
  };
});

const mockMovieDetails: Record<string, MovieDetails> = {
  "tt0000001": {
    imdbID: "tt0000001",
    Title: "Mock Movie 1",
    Year: "2023",
    Rated: "PG-13",
    Released: "15 Jan 2023",
    Runtime: "120 min",
    Genre: "Action, Adventure, Sci-Fi",
    Director: "John Director",
    Writer: "Jane Writer",
    Actors: "Actor One, Actress Two, Supporting Actor",
    Plot: "In a world where movies are mocked, one film stands above the rest. This is the story of that film, its struggles, and its ultimate triumph over adversity.",
    Language: "English",
    Country: "United States",
    Awards: "Won 1 Oscar. Another 5 wins & 10 nominations.",
    Poster: "/mock-movie-1.svg",
    Ratings: [
      { Source: "Internet Movie Database", Value: "7.8/10" },
      { Source: "Rotten Tomatoes", Value: "85%" },
      { Source: "Metacritic", Value: "72/100" },
    ],
    Metascore: "72",
    imdbRating: "7.8",
    imdbVotes: "125,432",
    Type: "movie",
    Response: "True",
  },
};

export function mockSearchMovies(query: string, page: number = 1): MovieSearchResponse {
  const resultsPerPage = 10;
  const startIndex = (page - 1) * resultsPerPage;
  
  // Filter movies based on query
  const filteredMovies = query
    ? mockMovies.filter(movie => 
        movie.Title.toLowerCase().includes(query.toLowerCase()) ||
        movie.Year.includes(query)
      )
    : mockMovies;
  
  const endIndex = startIndex + resultsPerPage;
  const paginatedResults = filteredMovies.slice(startIndex, endIndex);
  
  return {
    Search: paginatedResults,
    totalResults: filteredMovies.length.toString(),
    Response: "True",
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
    imdbID: baseMovie.imdbID,
    Title: baseMovie.Title,
    Year: baseMovie.Year,
    Rated: "PG-13",
    Released: "15 Jan 2023",
    Runtime: "120 min",
    Genre: "Action, Adventure, Sci-Fi",
    Director: "John Director",
    Writer: "Jane Writer",
    Actors: "Actor One, Actress Two, Supporting Actor",
    Plot: `This is the detailed plot for ${baseMovie.Title}. In a world where movies are mocked, this film tells an extraordinary story that captivates audiences worldwide.`,
    Language: "English",
    Country: "United States",
    Awards: "Won 1 Oscar. Another 5 wins & 10 nominations.",
    Poster: baseMovie.Poster,
    Ratings: [
      { Source: "Internet Movie Database", Value: "7.8/10" },
      { Source: "Rotten Tomatoes", Value: "85%" },
      { Source: "Metacritic", Value: "72/100" },
    ],
    Metascore: "72",
    imdbRating: "7.8",
    imdbVotes: "125,432",
    Type: "movie",
    Response: "True",
  };
}
