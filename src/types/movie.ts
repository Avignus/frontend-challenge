export interface MovieSearchResult {
  id: string;
  primaryTitle: string;
  originalTitle?: string;
  fullTitle?: string;
  type: string;
  year?: number;
  primaryImage?: {
    url: string;
    height?: number;
    width?: number;
    caption?: string;
  };
  releaseDate?: string;
  runtimeMinutes?: number;
  plot?: string;
  genres?: string[];
  directors?: string[];
  writers?: string[];
  stars?: string[];
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
  year?: number;
  primaryImage?: {
    url: string;
    height?: number;
    width?: number;
    caption?: string;
  };
  releaseDate?: string;
  releaseDateDetailed?: {
    day: number;
    month: number;
    year: number;
  };
  runtimeMinutes?: number;
  runtimeStr?: string;
  plot?: string;
  plotLocal?: string;
  genres?: {
    id: string;
    name: string;
  }[];
  directors?: {
    id: string;
    name: string;
  }[];
  writers?: {
    id: string;
    name: string;
  }[];
  stars?: {
    id: string;
    name: string;
  }[];
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
