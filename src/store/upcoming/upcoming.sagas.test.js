import { select } from 'redux-saga/effects';
import { testSaga, expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import loadingSelectors from 'store/api/loading/loading.selectors';
import * as api from 'api/tmdb';
import getMoviesResponse from 'api/tmdb/fixtures/getMoviesResponse';
import { convertResponseToMovieResults } from 'api/tmdb/utils';

import * as upcomingSagas from './upcoming.sagas';
import upcomingActions from './upcoming.actions';
import upcomingSelectors from './upcoming.selectors';
import UpcomingActionTypes from './upcoming.types';

describe('Upcoming sagas', () => {
  describe('onFetchMovies saga', () => {
    it('should trigger on FETCH_MOVIES', () => {
      testSaga(upcomingSagas.onFetchMovies)
        .next()
        .takeLatest(UpcomingActionTypes.FETCH_MOVIES, upcomingSagas.fetchMovies);
    });
  });

  describe('onFetchMoreMovies saga', () => {
    it('should trigger on FETCH_MORE_MOVIES', () => {
      testSaga(upcomingSagas.onFetchMoreMovies)
        .next()
        .takeEvery(UpcomingActionTypes.FETCH_MORE_MOVIES, upcomingSagas.fetchMoreMovies);
    });
  });

  describe('fetchMovies saga', () => {
    it('should fire fetchMoviesStart and then fetchMoviesSuccess if movies are fetched', () => {
      expectSaga(upcomingSagas.fetchMovies)
        .provide([[matchers.call.fn(api.getUpcomingMovies), { data: getMoviesResponse }]])
        .put(upcomingActions.fetchMoviesStart())
        .put(upcomingActions.fetchMoviesSuccess(convertResponseToMovieResults(getMoviesResponse)))
        .run();
    });

    it('should fire fetchMoviesStart and then fetchMoviesFailure if error is thrown', () => {
      const errorMessage = 'some error message';
      expectSaga(upcomingSagas.fetchMovies)
        .provide([
          [matchers.call.fn(api.getUpcomingMovies), throwError({ status_message: errorMessage })],
        ])
        .put(upcomingActions.fetchMoviesStart())
        .put(upcomingActions.fetchMoviesFailure(errorMessage))
        .run();
    });
  });

  describe('fetchMoreMovies saga', () => {
    it('should fire fetchMoreMoviesStart and then fetchMoreMoviesSuccess if more movies are fetched', () => {
      expectSaga(upcomingSagas.fetchMoreMovies)
        .provide([
          [matchers.call.fn(loadingSelectors.createIsLoadingSelector), () => false],
          [select(upcomingSelectors.selectCurrentPage), 1],
          [select(upcomingSelectors.selectTotalPages), 3],
          [matchers.call.fn(api.getUpcomingMovies), { data: getMoviesResponse }],
        ])
        .put(upcomingActions.fetchMoreMoviesStart())
        .put(
          upcomingActions.fetchMoreMoviesSuccess(convertResponseToMovieResults(getMoviesResponse)),
        )
        .run();
    });

    it('should fire fetchMoreMoviesStart and then fetchMoreMoviesFailure if error is thrown', () => {
      const errorMessage = 'some error message';
      expectSaga(upcomingSagas.fetchMoreMovies)
        .provide([
          [matchers.call.fn(loadingSelectors.createIsLoadingSelector), () => false],
          [select(upcomingSelectors.selectCurrentPage), 1],
          [select(upcomingSelectors.selectTotalPages), 3],
          [matchers.call.fn(api.getUpcomingMovies), throwError({ status_message: errorMessage })],
        ])
        .put(upcomingActions.fetchMoreMoviesStart())
        .put(upcomingActions.fetchMoreMoviesFailure(errorMessage))
        .run();
    });

    it('should not fire any actions if fetch more movies is loading', () => {
      expectSaga(upcomingSagas.fetchMoreMovies)
        .provide([
          [matchers.call.fn(loadingSelectors.createIsLoadingSelector), () => true],
          [select(upcomingSelectors.selectCurrentPage), 1],
          [select(upcomingSelectors.selectTotalPages), 3],
          [matchers.call.fn(api.getUpcomingMovies), { data: getMoviesResponse }],
        ])
        .run()
        .then(({ effects }) => {
          expect(effects.put).toBeUndefined();
        });
    });

    it('should not fire any actions if currentPage is greater than or equal to totalPages', () => {
      expectSaga(upcomingSagas.fetchMoreMovies)
        .provide([
          [matchers.call.fn(loadingSelectors.createIsLoadingSelector), () => false],
          [select(upcomingSelectors.selectCurrentPage), 3],
          [select(upcomingSelectors.selectTotalPages), 3],
          [matchers.call.fn(api.getUpcomingMovies), { data: getMoviesResponse }],
        ])
        .run()
        .then(({ effects }) => {
          expect(effects.put).toBeUndefined();
        });
    });
  });
});
