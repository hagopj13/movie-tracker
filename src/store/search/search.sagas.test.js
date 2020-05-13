import { select } from 'redux-saga/effects';
import { testSaga, expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import loadingSelectors from 'store/api/loading/loading.selectors';
import * as api from 'api/tmdb';
import getMoviesResponse from 'api/tmdb/fixtures/getMoviesResponse';
import { convertResponseToMovieResults } from 'api/tmdb/utils';

import * as seachSagas from './search.sagas';
import searchActions from './search.actions';
import searchSelectors from './search.selectors';
import SearchActionTypes from './search.types';

describe('Search sagas', () => {
  describe('onFetchMovies saga', () => {
    it('should trigger on FETCH_MOVIES', () => {
      testSaga(seachSagas.onFetchMovies)
        .next()
        .takeLatest(SearchActionTypes.FETCH_MOVIES, seachSagas.fetchMovies);
    });
  });

  describe('onFetchMoreMovies saga', () => {
    it('should trigger on FETCH_MORE_MOVIES', () => {
      testSaga(seachSagas.onFetchMoreMovies)
        .next()
        .takeEvery(SearchActionTypes.FETCH_MORE_MOVIES, seachSagas.fetchMoreMovies);
    });
  });

  describe('fetchMovies saga', () => {
    it('should fire fetchMoviesStart and then fetchMoviesSuccess if movies are fetched', () => {
      expectSaga(seachSagas.fetchMovies)
        .provide([
          [select(searchSelectors.selectQuery), 'someQuery'],
          [matchers.call.fn(api.searchMovies), { data: getMoviesResponse }],
        ])
        .put(searchActions.fetchMoviesStart())
        .put(searchActions.fetchMoviesSuccess(convertResponseToMovieResults(getMoviesResponse)))
        .run();
    });

    it('should fire fetchMoviesStart and then fetchMoviesFailure if error is thrown', () => {
      const errorMessage = 'some error message';
      expectSaga(seachSagas.fetchMovies)
        .provide([
          [select(searchSelectors.selectQuery), 'someQuery'],
          [matchers.call.fn(api.searchMovies), throwError({ status_message: errorMessage })],
        ])
        .put(searchActions.fetchMoviesStart())
        .put(searchActions.fetchMoviesFailure(errorMessage))
        .run();
    });
  });

  describe('fetchMoreMovies saga', () => {
    it('should fire fetchMoreMoviesStart and then fetchMoreMoviesSuccess if more movies are fetched', () => {
      expectSaga(seachSagas.fetchMoreMovies)
        .provide([
          [select(searchSelectors.selectQuery), 'someQuery'],
          [matchers.call.fn(loadingSelectors.createIsLoadingSelector), () => false],
          [select(searchSelectors.selectCurrentPage), 1],
          [select(searchSelectors.selectTotalPages), 3],
          [matchers.call.fn(api.searchMovies), { data: getMoviesResponse }],
        ])
        .put(searchActions.fetchMoreMoviesStart())
        .put(searchActions.fetchMoreMoviesSuccess(convertResponseToMovieResults(getMoviesResponse)))
        .run();
    });

    it('should fire fetchMoreMoviesStart and then fetchMoreMoviesFailure if error is thrown', () => {
      const errorMessage = 'some error message';
      expectSaga(seachSagas.fetchMoreMovies)
        .provide([
          [select(searchSelectors.selectQuery), 'someQuery'],
          [matchers.call.fn(loadingSelectors.createIsLoadingSelector), () => false],
          [select(searchSelectors.selectCurrentPage), 1],
          [select(searchSelectors.selectTotalPages), 3],
          [matchers.call.fn(api.searchMovies), throwError({ status_message: errorMessage })],
        ])
        .put(searchActions.fetchMoreMoviesStart())
        .put(searchActions.fetchMoreMoviesFailure(errorMessage))
        .run();
    });

    it('should not fire any actions if fetch more movies is loading', () => {
      expectSaga(seachSagas.fetchMoreMovies)
        .provide([
          [select(searchSelectors.selectQuery), 'someQuery'],
          [matchers.call.fn(loadingSelectors.createIsLoadingSelector), () => true],
          [select(searchSelectors.selectCurrentPage), 1],
          [select(searchSelectors.selectTotalPages), 3],
          [matchers.call.fn(api.searchMovies), { data: getMoviesResponse }],
        ])
        .run()
        .then(({ effects }) => {
          expect(effects.put).toBeUndefined();
        });
    });

    it('should not fire any actions if currentPage is greater than or equal to totalPages', () => {
      expectSaga(seachSagas.fetchMoreMovies)
        .provide([
          [select(searchSelectors.selectQuery), 'someQuery'],
          [matchers.call.fn(loadingSelectors.createIsLoadingSelector), () => false],
          [select(searchSelectors.selectCurrentPage), 3],
          [select(searchSelectors.selectTotalPages), 3],
          [matchers.call.fn(api.searchMovies), { data: getMoviesResponse }],
        ])
        .run()
        .then(({ effects }) => {
          expect(effects.put).toBeUndefined();
        });
    });
  });
});
