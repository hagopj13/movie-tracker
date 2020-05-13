import typeGenerator from 'store/common/utils/typeGenerator';
import movieResults from 'store/fixtures/movies';

import moviesActionsGenerator from './movies.actions';
import MoviesActionTypes from './movies.types';

const namespace = 'someNamespace';
const moviesActions = moviesActionsGenerator(namespace);

describe('Movies action creators', () => {
  describe('fetchMovies action creator', () => {
    it('should create the fetchMovies action', () => {
      const action = moviesActions.fetchMovies();
      expect(action.type).toBe(typeGenerator(namespace, MoviesActionTypes.FETCH_MOVIES));
    });
  });

  describe('fetchMoviesStart action creator', () => {
    it('should create the fetchMoviesStart action', () => {
      const action = moviesActions.fetchMoviesStart();
      expect(action.type).toBe(typeGenerator(namespace, MoviesActionTypes.FETCH_MOVIES_START));
    });
  });

  describe('fetchMoviesSuccess action creator', () => {
    it('should create the fetchMoviesSuccess action', () => {
      const action = moviesActions.fetchMoviesSuccess(movieResults);
      expect(action.type).toBe(typeGenerator(namespace, MoviesActionTypes.FETCH_MOVIES_SUCCESS));
      expect(action.payload).toEqual({ results: movieResults });
    });
  });

  describe('fetchMoviesFailure action creator', () => {
    it('should create the fetchMoviesFailure action', () => {
      const error = 'some error message';
      const action = moviesActions.fetchMoviesFailure(error);
      expect(action.type).toBe(typeGenerator(namespace, MoviesActionTypes.FETCH_MOVIES_FAILURE));
      expect(action.payload).toEqual({ error });
    });
  });

  describe('fetchMoreMovies action creator', () => {
    it('should create the fetchMoreMovies action', () => {
      const action = moviesActions.fetchMoreMovies();
      expect(action.type).toBe(typeGenerator(namespace, MoviesActionTypes.FETCH_MORE_MOVIES));
    });
  });

  describe('fetchMoreMoviesStart action creator', () => {
    it('should create the fetchMoreMoviesStart action', () => {
      const action = moviesActions.fetchMoreMoviesStart();
      expect(action.type).toBe(typeGenerator(namespace, MoviesActionTypes.FETCH_MORE_MOVIES_START));
    });
  });

  describe('fetchMoreMoviesSuccess action creator', () => {
    it('should create the fetchMoreMoviesSuccess action', () => {
      const action = moviesActions.fetchMoreMoviesSuccess(movieResults);
      expect(action.type).toBe(
        typeGenerator(namespace, MoviesActionTypes.FETCH_MORE_MOVIES_SUCCESS),
      );
      expect(action.payload).toEqual({ results: movieResults });
    });
  });

  describe('fetchMoreMoviesFailure action creator', () => {
    it('should create the fetchMoreMoviesFailure action', () => {
      const error = 'some error message';
      const action = moviesActions.fetchMoreMoviesFailure(error);
      expect(action.type).toBe(
        typeGenerator(namespace, MoviesActionTypes.FETCH_MORE_MOVIES_FAILURE),
      );
      expect(action.payload).toEqual({ error });
    });
  });
});
