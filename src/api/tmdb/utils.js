import type { MoviesListItem, MovieDetails, MovieUserState, Actor } from 'types';

export const convertResponseToMoviesListItem = (response: any): MoviesListItem => ({
  id: response.id,
  title: response.title,
  releaseDate: response.release_date,
  voteAverage: Math.round((response.vote_average / 2) * 10) / 10,
  voteCount: response.vote_count,
  posterPath: response.poster_path,
});

export const convertResponseToActor = (response: any): Actor => ({
  id: response.id,
  name: response.name,
  character: response.character,
  profilePath: response.profile_path,
});

export const convertResponseToMovieDetails = (response: any): MovieDetails => ({
  id: response.id,
  title: response.title,
  tagline: response.tagline,
  overview: response.overview,
  runtime: response.runtime,
  status: response.status,
  releaseDate: response.release_date,
  genres: response.genres,
  voteAverage: Math.round((response.vote_average / 2) * 10) / 10,
  voteCount: response.vote_count,
  posterPath: response.poster_path,
  backdropPath: response.backdrop_path,
  cast: response.credits.cast.map(convertResponseToActor),
  reviews: response.reviews.results,
  recommendations: response.recommendations.results.map(convertResponseToMoviesListItem),
});

export const convertResponseToMovieUserState = (response: any): MovieUserState => ({
  isFavorite: response.account_states?.favorite ?? false,
  isInWatchlist: response.account_states?.watchlist ?? false,
  rating: response.account_states?.rated ? response.account_states.rated.value : null,
});
