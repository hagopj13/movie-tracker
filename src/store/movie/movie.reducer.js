// @flow
import { handleActions } from 'redux-actions';

import AuthActionTypes from 'store/auth/auth.types';
import type { Movie, MovieUserState } from 'types';

import MovieActionTypes from './movie.types';

type State = {
  details: Movie,
  userState: MovieUserState,
};

export const initialState: State = {
  details: {
    id: null,
    title: '',
    releaseDate: '',
    voteAverage: 0,
    voteCount: 0,
    posterPath: '',
    backdropPath: '',
    tagline: '',
    overview: '',
    runtime: 0,
    status: '',
    genres: [],
    actors: [],
    reviews: [],
    recommendations: [],
  },
  userState: {
    isFavorite: false,
    isInWatchlist: false,
    rating: null,
  },
};

const fetchMovieStart = () => initialState;

const fetchMovieSuccess = (state: State, action) => ({
  ...state,
  details: action.payload.movie,
  userState: action.payload.movieUserState,
});

const fetchMovieUserStateSuccess = (state: State, action) => ({
  ...state,
  userState: action.payload.movieUserState,
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

const logoutSuccess = (state: State) => ({
  ...state,
  userState: initialState.userState,
});

const movieActionHandler = {
  [MovieActionTypes.FETCH_MOVIE_START]: fetchMovieStart,
  [MovieActionTypes.FETCH_MOVIE_SUCCESS]: fetchMovieSuccess,
  [MovieActionTypes.FETCH_MOVIE_USER_STATE_SUCCESS]: fetchMovieUserStateSuccess,
  [MovieActionTypes.SET_IS_MOVIE_FAVORITE_SUCCESS]: setIsMovieFavoriteSuccess,
  [MovieActionTypes.SET_IS_MOVIE_IN_WATCHLIST_SUCCESS]: setIsMovieInWatchlistSuccess,
  [MovieActionTypes.RATE_MOVIE_SUCCESS]: rateMovieSuccess,
  [AuthActionTypes.LOGOUT_SUCCESS]: logoutSuccess,
};

export default handleActions(movieActionHandler, initialState);
