import type { Movie, MovieUserState, Actor } from 'types';

export const convertResponseToActor = (response: any): Actor => ({
  id: response.id,
  name: response.name,
  character: response.character,
  profilePath: response.profile_path,
});

export const convertResponseToMovie = (response: any): Movie => ({
  id: response.id,
  title: response.title,
  releaseDate: response.release_date,
  voteAverage: Math.round((response.vote_average / 2) * 10) / 10,
  voteCount: response.vote_count,
  posterPath: response.poster_path,
  backdropPath: response.backdrop_path,
  tagline: response.tagline,
  overview: response.overview,
  runtime: response.runtime,
  status: response.status,
  genres: response.genres,
  actors: response.credits?.cast?.map(convertResponseToActor),
  reviews: response.reviews?.results,
  recommendations: response.recommendations?.results?.map(convertResponseToMovie),
});

export const convertResponseToMovieUserState = (response: any): MovieUserState => ({
  isFavorite: response?.favorite ?? false,
  isInWatchlist: response?.watchlist ?? false,
  rating: response?.rated ? response.rated.value / 2 : null,
});
