// @flow
import { handleActions } from 'redux-actions';

import { convertResponseToMovieDetails, convertResponseToMovieUserState } from 'api/tmdb/utils';
import type { MovieDetails, MovieUserState } from 'types';

import MovieActionTypes from './movie.types';

type State = {
  details: MovieDetails | null,
  userState: MovieUserState | null,
};

const initialState: MovieDetails = {
  details: null,
  userState: null,
};

const fetchMovieStart = () => initialState;

const fetchMovieSuccess = (state: State, action) => ({
  details: convertResponseToMovieDetails(action.payload.data),
  userState: convertResponseToMovieUserState(action.payload.data),
});

const movieActionHandler = {
  [MovieActionTypes.FETCH_MOVIE_START]: fetchMovieStart,
  [MovieActionTypes.FETCH_MOVIE_SUCCESS]: fetchMovieSuccess,
};

export default handleActions(movieActionHandler, initialState);
