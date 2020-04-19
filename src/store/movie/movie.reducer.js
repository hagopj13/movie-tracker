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

const setIsMovieFavoriteSuccess = (state: State, action) => {
  if (action.payload.id === state.details?.id) {
    return {
      ...state,
      userState: {
        ...state.userState,
        isFavorite: action.payload.isFavorite,
      },
    };
  }
  return state;
};

const setIsMovieInWatchlistSuccess = (state: State, action) => {
  if (action.payload.id === state.details?.id) {
    return {
      ...state,
      userState: {
        ...state.userState,
        isInWatchlist: action.payload.isInWatchlist,
      },
    };
  }
  return state;
};

const rateMovieSuccess = (state: State, action) => {
  if (action.payload.id === state.details?.id) {
    return {
      ...state,
      userState: {
        ...state.userState,
        rating: action.payload.rating,
      },
    };
  }
  return state;
};

const movieActionHandler = {
  [MovieActionTypes.FETCH_MOVIE_START]: fetchMovieStart,
  [MovieActionTypes.FETCH_MOVIE_SUCCESS]: fetchMovieSuccess,
  [MovieActionTypes.SET_IS_MOVIE_FAVORITE_SUCCESS]: setIsMovieFavoriteSuccess,
  [MovieActionTypes.SET_IS_MOVIE_IN_WATCHLIST_SUCCESS]: setIsMovieInWatchlistSuccess,
  [MovieActionTypes.RATE_MOVIE_SUCCESS]: rateMovieSuccess,
};

export default handleActions(movieActionHandler, initialState);
