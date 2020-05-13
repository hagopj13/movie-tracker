import AuthActionTypes from 'store/auth/auth.types';
import { details as movie, userState as movieUserState } from 'store/fixtures/movie';

import movieReducer, { initialState } from './movie.reducer';
import MovieActionTypes from './movie.types';

describe('Movie reducer', () => {
  it('should return the initial state', () => {
    const state = movieReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });

  it('should reset the state on fetchMovieStart action', () => {
    const action = {
      type: MovieActionTypes.FETCH_MOVIE_START,
    };
    const state = movieReducer(initialState, action);
    expect(state).toEqual(initialState);
  });

  it('should set the movie details and userState on fetchMovieSuccess action', () => {
    const action = {
      type: MovieActionTypes.FETCH_MOVIE_SUCCESS,
      payload: { movie, movieUserState },
    };
    const state = movieReducer(initialState, action);
    expect(state).toEqual({ details: movie, userState: movieUserState });
  });

  it('should set the movie userState on fetchMovieUserStateSuccess action', () => {
    const currentState = {
      details: movie,
      userState: {
        isFavorite: false,
        isInWatchlist: false,
        rating: null,
      },
    };
    const newUserState = {
      isFavorite: true,
      isInWatchlist: true,
      rating: 5,
    };
    const action = {
      type: MovieActionTypes.FETCH_MOVIE_USER_STATE_SUCCESS,
      payload: { movieUserState: newUserState },
    };
    const state = movieReducer(currentState, action);
    expect(state.userState).toEqual(newUserState);
  });

  it('should set isFavorite in userState on setIsMovieFavoriteSuccess action', () => {
    const currentState = {
      details: movie,
      userState: {
        isFavorite: false,
      },
    };
    const newIsFavorite = true;
    const action = {
      type: MovieActionTypes.SET_IS_MOVIE_FAVORITE_SUCCESS,
      payload: { id: movie.id, isFavorite: newIsFavorite },
    };
    const state = movieReducer(currentState, action);
    expect(state.userState.isFavorite).toEqual(newIsFavorite);
  });

  it('should set isInWatchlit in userState on setIsMovieInWatchlistSuccess action', () => {
    const currentState = {
      details: movie,
      userState: {
        isInWatchlist: false,
      },
    };
    const newIsInWatchlist = true;
    const action = {
      type: MovieActionTypes.SET_IS_MOVIE_IN_WATCHLIST_SUCCESS,
      payload: { id: movie.id, isInWatchlist: newIsInWatchlist },
    };
    const state = movieReducer(currentState, action);
    expect(state.userState.isInWatchlist).toEqual(newIsInWatchlist);
  });

  it('should set rating in userState on rateMovieSuccess action', () => {
    const currentState = {
      details: movie,
      userState: {
        rating: 5,
      },
    };
    const newRating = 6;
    const action = {
      type: MovieActionTypes.RATE_MOVIE_SUCCESS,
      payload: { id: movie.id, rating: newRating },
    };
    const state = movieReducer(currentState, action);
    expect(state.userState.rating).toEqual(newRating);
  });

  it('should reset the userState on logoutSuccess action', () => {
    const currentState = {
      details: movie,
      userState: {
        isFavorite: true,
        isInWatchlist: true,
        rating: 5,
      },
    };
    const action = {
      type: AuthActionTypes.LOGOUT_SUCCESS,
    };
    const state = movieReducer(currentState, action);
    expect(state.userState).toEqual(initialState.userState);
  });
});
