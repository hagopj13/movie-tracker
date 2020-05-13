import { select } from 'redux-saga/effects';
import { testSaga, expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import authSelectors from 'store/auth/auth.selectors';
import loadingSelectors from 'store/api/loading/loading.selectors';
import * as api from 'api/tmdb';
import getMoviesResponse from 'api/tmdb/fixtures/getMoviesResponse';
import { convertResponseToMovieResults } from 'api/tmdb/utils';

import * as watchlistSagas from './watchlist.sagas';
import watchlistActions from './watchlist.actions';
import watchlistSelectors from './watchlist.selectors';
import WatchlistActionTypes from './watchlist.types';

describe('Watchlist sagas', () => {
  describe('onFetchMovies saga', () => {
    it('should trigger on FETCH_MOVIES', () => {
      testSaga(watchlistSagas.onFetchMovies)
        .next()
        .takeLatest(WatchlistActionTypes.FETCH_MOVIES, watchlistSagas.fetchMovies);
    });
  });

  describe('onFetchMoreMovies saga', () => {
    it('should trigger on FETCH_MORE_MOVIES', () => {
      testSaga(watchlistSagas.onFetchMoreMovies)
        .next()
        .takeEvery(WatchlistActionTypes.FETCH_MORE_MOVIES, watchlistSagas.fetchMoreMovies);
    });
  });

  describe('fetchMovies saga', () => {
    it('should fire fetchMoviesStart and then fetchMoviesSuccess if movies are fetched', () => {
      expectSaga(watchlistSagas.fetchMovies)
        .provide([
          [select(authSelectors.selectSessionId), 'someSessionId'],
          [select(authSelectors.selectAccountId), 'someAccountId'],
          [matchers.call.fn(api.getWatchlistMovies), { data: getMoviesResponse }],
        ])
        .put(watchlistActions.fetchMoviesStart())
        .put(watchlistActions.fetchMoviesSuccess(convertResponseToMovieResults(getMoviesResponse)))
        .run();
    });

    it('should fire fetchMoviesStart and then fetchMoviesFailure if error is thrown', () => {
      const errorMessage = 'some error message';
      expectSaga(watchlistSagas.fetchMovies)
        .provide([
          [select(authSelectors.selectSessionId), 'someSessionId'],
          [select(authSelectors.selectAccountId), 'someAccountId'],
          [matchers.call.fn(api.getWatchlistMovies), throwError({ status_message: errorMessage })],
        ])
        .put(watchlistActions.fetchMoviesStart())
        .put(watchlistActions.fetchMoviesFailure(errorMessage))
        .run();
    });
  });

  describe('fetchMoreMovies saga', () => {
    it('should fire fetchMoreMoviesStart and then fetchMoreMoviesSuccess if more movies are fetched', () => {
      expectSaga(watchlistSagas.fetchMoreMovies)
        .provide([
          [matchers.call.fn(loadingSelectors.createIsLoadingSelector), () => false],
          [select(authSelectors.selectSessionId), 'someSessionId'],
          [select(authSelectors.selectAccountId), 'someAccountId'],
          [select(watchlistSelectors.selectCurrentPage), 1],
          [select(watchlistSelectors.selectTotalPages), 3],
          [matchers.call.fn(api.getWatchlistMovies), { data: getMoviesResponse }],
        ])
        .put(watchlistActions.fetchMoreMoviesStart())
        .put(
          watchlistActions.fetchMoreMoviesSuccess(convertResponseToMovieResults(getMoviesResponse)),
        )
        .run();
    });

    it('should fire fetchMoreMoviesStart and then fetchMoreMoviesFailure if error is thrown', () => {
      const errorMessage = 'some error message';
      expectSaga(watchlistSagas.fetchMoreMovies)
        .provide([
          [matchers.call.fn(loadingSelectors.createIsLoadingSelector), () => false],
          [select(authSelectors.selectSessionId), 'someSessionId'],
          [select(authSelectors.selectAccountId), 'someAccountId'],
          [select(watchlistSelectors.selectCurrentPage), 1],
          [select(watchlistSelectors.selectTotalPages), 3],
          [matchers.call.fn(api.getWatchlistMovies), throwError({ status_message: errorMessage })],
        ])
        .put(watchlistActions.fetchMoreMoviesStart())
        .put(watchlistActions.fetchMoreMoviesFailure(errorMessage))
        .run();
    });

    it('should not fire any actions if fetch more movies is loading', () => {
      expectSaga(watchlistSagas.fetchMoreMovies)
        .provide([
          [matchers.call.fn(loadingSelectors.createIsLoadingSelector), () => true],
          [select(authSelectors.selectSessionId), 'someSessionId'],
          [select(authSelectors.selectAccountId), 'someAccountId'],
          [select(watchlistSelectors.selectCurrentPage), 1],
          [select(watchlistSelectors.selectTotalPages), 3],
          [matchers.call.fn(api.getWatchlistMovies), { data: getMoviesResponse }],
        ])
        .run()
        .then(({ effects }) => {
          expect(effects.put).toBeUndefined();
        });
    });

    it('should not fire any actions if currentPage is greater than or equal to totalPages', () => {
      expectSaga(watchlistSagas.fetchMoreMovies)
        .provide([
          [matchers.call.fn(loadingSelectors.createIsLoadingSelector), () => false],
          [select(authSelectors.selectSessionId), 'someSessionId'],
          [select(authSelectors.selectAccountId), 'someAccountId'],
          [select(watchlistSelectors.selectCurrentPage), 3],
          [select(watchlistSelectors.selectTotalPages), 3],
          [matchers.call.fn(api.getWatchlistMovies), { data: getMoviesResponse }],
        ])
        .run()
        .then(({ effects }) => {
          expect(effects.put).toBeUndefined();
        });
    });
  });
});
