export type Genre = { id: number, name: string };

export type Actor = {
  id: number,
  name: string,
  character: string,
  profilePath: string,
};

export type Review = {
  id: number,
  author: string,
  content: string,
  url: string,
};

export type Movie = {
  id: number,
  title: string,
  releaseDate: string,
  voteAverage: number,
  voteCount: number,
  posterPath: string,
  backdropPath: string,
  tagline: string,
  overview: string,
  runtime: number,
  status: string,
  genres: Genre[],
  actors: Actor[],
  reviews: Review[],
  recommendations: Movie[],
};

export type MovieUserState = {
  isFavorite: boolean,
  isInWatchlist: boolean,
  rating: number | null,
};
