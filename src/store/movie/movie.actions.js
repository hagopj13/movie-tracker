// @flow
import MovieActionTypes from './movie.types';

const fetchMovie = (id: string) => ({
  type: MovieActionTypes.FETCH_MOVIE,
  payload: { id },
});

const fetchMovieStart = () => ({
  type: MovieActionTypes.FETCH_MOVIE_START,
});

const fetchMovieSuccess = (data: any) => ({
  type: MovieActionTypes.FETCH_MOVIE_SUCCESS,
  payload: { data },
});

const fetchMovieFailure = (error: string) => ({
  type: MovieActionTypes.FETCH_MOVIE_FAILURE,
  payload: { error },
});

const setIsMovieFavorite = (id: number, isFavorite: boolean) => ({
  type: MovieActionTypes.SET_IS_MOVIE_FAVORITE,
  payload: { id, isFavorite },
});

const setIsMovieFavoriteStart = () => ({
  type: MovieActionTypes.SET_IS_MOVIE_FAVORITE_START,
});

const setIsMovieFavoriteSuccess = (id: number, isFavorite: boolean) => ({
  type: MovieActionTypes.SET_IS_MOVIE_FAVORITE_SUCCESS,
  payload: { id, isFavorite },
});

const setIsMovieFavoriteFailure = (error: string) => ({
  type: MovieActionTypes.SET_IS_MOVIE_FAVORITE_FAILURE,
  payload: { error },
});

const setIsMovieInWatchlist = (id: string, isInWatchlist: boolean) => ({
  type: MovieActionTypes.SET_IS_MOVIE_IN_WATCHLIST,
  payload: { id, isInWatchlist },
});

const setIsMovieInWatchlistStart = () => ({
  type: MovieActionTypes.SET_IS_MOVIE_IN_WATCHLIST_START,
});

const setIsMovieInWatchlistSuccess = (id: number, isInWatchlist: boolean) => ({
  type: MovieActionTypes.SET_IS_MOVIE_IN_WATCHLIST_SUCCESS,
  payload: { id, isInWatchlist },
});

const setIsMovieInWatchlistFailure = (error: string) => ({
  type: MovieActionTypes.SET_IS_MOVIE_IN_WATCHLIST_FAILURE,
  payload: { error },
});

const rateMovie = (id: number, rating: number | null) => ({
  type: MovieActionTypes.RATE_MOVIE,
  payload: { id, rating },
});

const rateMovieStart = () => ({
  type: MovieActionTypes.RATE_MOVIE_START,
});

const rateMovieSuccess = (id: number, rating: number | null) => ({
  type: MovieActionTypes.RATE_MOVIE_SUCCESS,
  payload: { id, rating },
});

const rateMovieFailure = (error: string) => ({
  type: MovieActionTypes.RATE_MOVIE_FAILURE,
  payload: { error },
});

export default {
  fetchMovie,
  fetchMovieStart,
  fetchMovieSuccess,
  fetchMovieFailure,
  setIsMovieFavorite,
  setIsMovieFavoriteStart,
  setIsMovieFavoriteSuccess,
  setIsMovieFavoriteFailure,
  setIsMovieInWatchlist,
  setIsMovieInWatchlistStart,
  setIsMovieInWatchlistSuccess,
  setIsMovieInWatchlistFailure,
  rateMovie,
  rateMovieStart,
  rateMovieSuccess,
  rateMovieFailure,
};