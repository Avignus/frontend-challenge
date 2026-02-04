// According to imdb.yaml: imdbapiRating has aggregateRating and voteCount
export interface Rating {
  aggregateRating?: number;
  voteCount?: number;
}

export interface MovieSearchResult {
  id: string;
  primaryTitle: string;
  originalTitle?: string;
  fullTitle?: string;
  type: string;
  startYear?: number;
  primaryImage?: {
    url: string;
    width?: number;
    height?: number;
    caption?: string;
  };
  releaseDate?: string;
  runtimeSeconds?: number;
  plot?: string;
  genres?: string[];
  rating?: Rating; // According to imdb.yaml: rating is an object
}

export interface MovieSearchResponse {
  titles: MovieSearchResult[];
  nextPageToken?: string;
  totalCount?: number;
}

export interface Person {
  id: string;
  displayName: string;
  alternativeNames?: string[];
  primaryProfessions?: string[];
}

export interface Country {
  code: string;
  name: string;
}

export interface Language {
  code: string;
  name: string;
}

export interface Interest {
  id: string;
  name: string;
}

export interface Metacritic {
  url?: string;
  score?: number;
  reviewCount?: number;
}

export interface MovieDetails {
  id: string;
  primaryTitle: string;
  originalTitle?: string;
  fullTitle?: string;
  type: string;
  startYear?: number;
  endYear?: number;
  primaryImage?: {
    url: string;
    width?: number;
    height?: number;
    caption?: string;
    type?: string;
  };
  releaseDate?: string;
  releaseDateDetailed?: {
    day: number;
    month: number;
    year: number;
  };
  runtimeSeconds?: number;
  plot?: string;
  genres?: string[];
  directors?: Person[];
  writers?: Person[];
  stars?: Person[];
  // According to imdb.yaml: rating is an imdbapiRating object with aggregateRating and voteCount
  rating?: Rating;
  // According to imdb.yaml: metacritic is an imdbapiMetacritic object
  metacritic?: Metacritic;
  contentRating?: string;
  imdbId?: string;
  tagline?: string;
  companies?: {
    id: string;
    name: string;
  }[];
  originCountries?: Country[];
  spokenLanguages?: Language[];
  interests?: Interest[];
  isAdult?: boolean;
}
