export type Genre = { id: number, name: string };

export type Actor = {
  id: number,
  name: string,
  character: string,
  profilePath: string,
};

export type Keyword = { id: number, name: string };

export type Review = {
  id: number,
  author: string,
  content: string,
  url: string,
};

export type MoviesListItem = {
  id: number,
  title: string,
  releaseDate: string,
  voteAverage: number,
  voteCount: number,
  posterPath: string,
};

export type MovieDetails = {
  id: number,
  title: string,
  tagline: string,
  overview: string,
  runtime: number,
  status: string,
  releaseDate: string,
  genres: Genre[],
  voteAverage: number,
  voteCount: number,
  posterPath: string,
  backdropPath: string,
  budget: number,
  revenue: number,
  cast: Actor[],
  keywords: Keyword[],
  reviews: Review[],
  recommendations: MoviesListItem[],
  userState: {
    isFavorite: boolean,
    isInWatchlist: boolean,
    rating: number | null,
  },
};
