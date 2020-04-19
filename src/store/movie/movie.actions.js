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

export default {
  fetchMovie,
  fetchMovieStart,
  fetchMovieSuccess,
  fetchMovieFailure,
};
