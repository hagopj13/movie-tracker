import { details as movie, userState as movieUserState } from 'store/fixtures/movie';

import movieActions from './movie.actions';
import MovieActionTypes from './movie.types';

describe('Movie action creators', () => {
  describe('fetchMovie action creator', () => {
    it('should create the fetchMovie action', () => {
      const id = 'someMovieId';
      const action = movieActions.fetchMovie(id);
      expect(action.type).toBe(MovieActionTypes.FETCH_MOVIE);
      expect(action.payload).toEqual({ id });
    });
  });

  describe('fetchMovieStart action creator', () => {
    it('should create the fetchMovieStart action', () => {
      const action = movieActions.fetchMovieStart();
      expect(action.type).toBe(MovieActionTypes.FETCH_MOVIE_START);
    });
  });

  describe('fetchMovieSuccess action creator', () => {
    it('should create the fetchMovieSuccess action', () => {
      const action = movieActions.fetchMovieSuccess(movie, movieUserState);
      expect(action.type).toBe(MovieActionTypes.FETCH_MOVIE_SUCCESS);
      expect(action.payload).toEqual({ movie, movieUserState });
    });
  });

  describe('fetchMovieFailure action creator', () => {
    it('should create the fetchMovieFailure action', () => {
      const error = 'some error message';
      const action = movieActions.fetchMovieFailure(error);
      expect(action.type).toBe(MovieActionTypes.FETCH_MOVIE_FAILURE);
      expect(action.payload).toEqual({ error });
    });
  });

  describe('fetchMovieUserState action creator', () => {
    it('should create the fetchMovieUserState action', () => {
      const id = 'someMovieId';
      const action = movieActions.fetchMovieUserState(id);
      expect(action.type).toBe(MovieActionTypes.FETCH_MOVIE_USER_STATE);
      expect(action.payload).toEqual({ id });
    });
  });

  describe('fetchMovieUserStateStart action creator', () => {
    it('should create the fetchMovieUserStateStart action', () => {
      const action = movieActions.fetchMovieUserStateStart();
      expect(action.type).toBe(MovieActionTypes.FETCH_MOVIE_USER_STATE_START);
    });
  });

  describe('fetchMovieUserStateSuccess action creator', () => {
    it('should create the fetchMovieUserStateSuccess action', () => {
      const action = movieActions.fetchMovieUserStateSuccess(movieUserState);
      expect(action.type).toBe(MovieActionTypes.FETCH_MOVIE_USER_STATE_SUCCESS);
      expect(action.payload).toEqual({ movieUserState });
    });
  });

  describe('fetchMovieUserStateFailure action creator', () => {
    it('should create the fetchMovieUserStateFailure action', () => {
      const error = 'some error message';
      const action = movieActions.fetchMovieUserStateFailure(error);
      expect(action.type).toBe(MovieActionTypes.FETCH_MOVIE_USER_STATE_FAILURE);
      expect(action.payload).toEqual({ error });
    });
  });

  describe('setIsMovieFavorite action creator', () => {
    it('should create the setIsMovieFavorite action', () => {
      const id = 'someMovieId';
      const isFavorite = true;
      const action = movieActions.setIsMovieFavorite(id, isFavorite);
      expect(action.type).toBe(MovieActionTypes.SET_IS_MOVIE_FAVORITE);
      expect(action.payload).toEqual({ id, isFavorite });
    });
  });

  describe('setIsMovieFavoriteStart action creator', () => {
    it('should create the setIsMovieFavoriteStart action', () => {
      const action = movieActions.setIsMovieFavoriteStart();
      expect(action.type).toBe(MovieActionTypes.SET_IS_MOVIE_FAVORITE_START);
    });
  });

  describe('setIsMovieFavoriteSuccess action creator', () => {
    it('should create the setIsMovieFavoriteSuccess action', () => {
      const id = 'someMovieId';
      const isFavorite = true;
      const action = movieActions.setIsMovieFavoriteSuccess(id, isFavorite);
      expect(action.type).toBe(MovieActionTypes.SET_IS_MOVIE_FAVORITE_SUCCESS);
      expect(action.payload).toEqual({ id, isFavorite });
    });
  });

  describe('setIsMovieFavoriteFailure action creator', () => {
    it('should create the setIsMovieFavoriteFailure action', () => {
      const error = 'some error message';
      const action = movieActions.setIsMovieFavoriteFailure(error);
      expect(action.type).toBe(MovieActionTypes.SET_IS_MOVIE_FAVORITE_FAILURE);
      expect(action.payload).toEqual({ error });
    });
  });

  describe('setIsMovieInWatchlist action creator', () => {
    it('should create the setIsMovieInWatchlist action', () => {
      const id = 'someMovieId';
      const isInWatchlist = true;
      const action = movieActions.setIsMovieInWatchlist(id, isInWatchlist);
      expect(action.type).toBe(MovieActionTypes.SET_IS_MOVIE_IN_WATCHLIST);
      expect(action.payload).toEqual({ id, isInWatchlist });
    });
  });

  describe('setIsMovieInWatchlistStart action creator', () => {
    it('should create the setIsMovieInWatchlistStart action', () => {
      const action = movieActions.setIsMovieInWatchlistStart();
      expect(action.type).toBe(MovieActionTypes.SET_IS_MOVIE_IN_WATCHLIST_START);
    });
  });

  describe('setIsMovieInWatchlistSuccess action creator', () => {
    it('should create the setIsMovieInWatchlistSuccess action', () => {
      const id = 'someMovieId';
      const isInWatchlist = true;
      const action = movieActions.setIsMovieInWatchlistSuccess(id, isInWatchlist);
      expect(action.type).toBe(MovieActionTypes.SET_IS_MOVIE_IN_WATCHLIST_SUCCESS);
      expect(action.payload).toEqual({ id, isInWatchlist });
    });
  });

  describe('setIsMovieInWatchlistFailure action creator', () => {
    it('should create the setIsMovieInWatchlistFailure action', () => {
      const error = 'some error message';
      const action = movieActions.setIsMovieInWatchlistFailure(error);
      expect(action.type).toBe(MovieActionTypes.SET_IS_MOVIE_IN_WATCHLIST_FAILURE);
      expect(action.payload).toEqual({ error });
    });
  });

  describe('rateMovie action creator', () => {
    it('should create the rateMovie action', () => {
      const id = 'someMovieId';
      const rating = 5;
      const action = movieActions.rateMovie(id, rating);
      expect(action.type).toBe(MovieActionTypes.RATE_MOVIE);
      expect(action.payload).toEqual({ id, rating });
    });
  });

  describe('rateMovieStart action creator', () => {
    it('should create the rateMovieStart action', () => {
      const action = movieActions.rateMovieStart();
      expect(action.type).toBe(MovieActionTypes.RATE_MOVIE_START);
    });
  });

  describe('rateMovieSuccess action creator', () => {
    it('should create the rateMovieSuccess action', () => {
      const id = 'someMovieId';
      const rating = 5;
      const action = movieActions.rateMovieSuccess(id, rating);
      expect(action.type).toBe(MovieActionTypes.RATE_MOVIE_SUCCESS);
      expect(action.payload).toEqual({ id, rating });
    });
  });

  describe('rateMovieFailure action creator', () => {
    it('should create the rateMovieFailure action', () => {
      const error = 'some error message';
      const action = movieActions.rateMovieFailure(error);
      expect(action.type).toBe(MovieActionTypes.RATE_MOVIE_FAILURE);
      expect(action.payload).toEqual({ error });
    });
  });
});
