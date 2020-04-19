// @flow
import MovieDetailsActionTypes from './movieDetails.types';

const fetchMovieDetails = (id: string) => ({
  type: MovieDetailsActionTypes.FETCH_MOVIE_DETAILS,
  payload: { id },
});

const fetchMovieDetailsStart = () => ({
  type: MovieDetailsActionTypes.FETCH_MOVIE_DETAILS_START,
});

const fetchMovieDetailsSuccess = (data: any) => ({
  type: MovieDetailsActionTypes.FETCH_MOVIE_DETAILS_SUCCESS,
  payload: { data },
});

const fetchMovieDetailsFailure = (error: string) => ({
  type: MovieDetailsActionTypes.FETCH_MOVIE_DETAILS_FAILURE,
  payload: { error },
});

export default {
  fetchMovieDetails,
  fetchMovieDetailsStart,
  fetchMovieDetailsSuccess,
  fetchMovieDetailsFailure,
};
