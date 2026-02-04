export interface MovieSearchResult {
  id: string;
  primaryTitle: string;
  originalTitle?: string;
  fullTitle?: string;
  type: string;
  startYear?: number; // Changed from year to startYear
  primaryImage?: {
    url: string;
    width?: number;
    height?: number;
    caption?: string;
  };
  releaseDate?: string;
  runtimeSeconds?: number; // Changed from runtimeMinutes to runtimeSeconds
  plot?: string;
  genres?: string[]; // Changed from object array to string array
  directors?: string[]; // Simplified to string array
  writers?: string[]; // Simplified to string array
  stars?: string[]; // Simplified to string array
  imdbRating?: number;
  imdbRatingCount?: number;
}

export interface MovieSearchResponse {
  titles: MovieSearchResult[];
  nextPageToken?: string;
  totalCount?: number;
}

export interface MovieDetails {
  id: string;
  primaryTitle: string;
  originalTitle?: string;
  fullTitle?: string;
  type: string;
  startYear?: number; // Changed from year to startYear
  primaryImage?: {
    url: string;
    width?: number;
    height?: number;
    caption?: string;
  };
  releaseDate?: string;
  releaseDateDetailed?: {
    day: number;
    month: number;
    year: number;
  };
  runtimeSeconds?: number; // Changed from runtimeMinutes to runtimeSeconds
  runtimeStr?: string;
  plot?: string;
  plotLocal?: string;
  genres?: string[]; // Changed to string array
  directors?: string[]; // Changed to string array
  writers?: string[]; // Changed to string array
  stars?: string[]; // Changed to string array
  ratings?: {
    id: string;
    title: string;
    rating: number;
    ratingCount: number;
  }[];
  imdbRating?: number;
  imdbRatingCount?: number;
  metacriticRating?: number;
  metacriticRatingCount?: number;
  contentRating?: string;
  imdbId?: string;
  tagline?: string;
  companies?: {
    id: string;
    name: string;
  }[];
  countries?: {
    id: string;
    name: string;
  }[];
  languages?: {
    id: string;
    name: string;
  }[];
}
