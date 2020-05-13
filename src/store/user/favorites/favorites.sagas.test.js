import { select } from 'redux-saga/effects';
import { testSaga, expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import authSelectors from 'store/auth/auth.selectors';
import loadingSelectors from 'store/api/loading/loading.selectors';
import * as api from 'api/tmdb';
import getMoviesResponse from 'api/tmdb/fixtures/getMoviesResponse';
import { convertResponseToMovieResults } from 'api/tmdb/utils';

import * as favoritesSagas from './favorites.sagas';
import favoritesActions from './favorites.actions';
import favoritesSelectors from './favorites.selectors';
import FavoritesActionTypes from './favorites.types';

describe('Favorites sagas', () => {
  describe('onFetchMovies saga', () => {
    it('should trigger on FETCH_MOVIES', () => {
      testSaga(favoritesSagas.onFetchMovies)
        .next()
        .takeLatest(FavoritesActionTypes.FETCH_MOVIES, favoritesSagas.fetchMovies);
    });
  });

  describe('onFetchMoreMovies saga', () => {
    it('should trigger on FETCH_MORE_MOVIES', () => {
      testSaga(favoritesSagas.onFetchMoreMovies)
        .next()
        .takeEvery(FavoritesActionTypes.FETCH_MORE_MOVIES, favoritesSagas.fetchMoreMovies);
    });
  });

  describe('fetchMovies saga', () => {
    it('should fire fetchMoviesStart and then fetchMoviesSuccess if movies are fetched', () => {
      expectSaga(favoritesSagas.fetchMovies)
        .provide([
          [select(authSelectors.selectSessionId), 'someSessionId'],
          [select(authSelectors.selectAccountId), 'someAccountId'],
          [matchers.call.fn(api.getFavoriteMovies), { data: getMoviesResponse }],
        ])
        .put(favoritesActions.fetchMoviesStart())
        .put(favoritesActions.fetchMoviesSuccess(convertResponseToMovieResults(getMoviesResponse)))
        .run();
    });

    it('should fire fetchMoviesStart and then fetchMoviesFailure if error is thrown', () => {
      const errorMessage = 'some error message';
      expectSaga(favoritesSagas.fetchMovies)
        .provide([
          [select(authSelectors.selectSessionId), 'someSessionId'],
          [select(authSelectors.selectAccountId), 'someAccountId'],
          [matchers.call.fn(api.getFavoriteMovies), throwError({ status_message: errorMessage })],
        ])
        .put(favoritesActions.fetchMoviesStart())
        .put(favoritesActions.fetchMoviesFailure(errorMessage))
        .run();
    });
  });

  describe('fetchMoreMovies saga', () => {
    it('should fire fetchMoreMoviesStart and then fetchMoreMoviesSuccess if more movies are fetched', () => {
      expectSaga(favoritesSagas.fetchMoreMovies)
        .provide([
          [matchers.call.fn(loadingSelectors.createIsLoadingSelector), () => false],
          [select(authSelectors.selectSessionId), 'someSessionId'],
          [select(authSelectors.selectAccountId), 'someAccountId'],
          [select(favoritesSelectors.selectCurrentPage), 1],
          [select(favoritesSelectors.selectTotalPages), 3],
          [matchers.call.fn(api.getFavoriteMovies), { data: getMoviesResponse }],
        ])
        .put(favoritesActions.fetchMoreMoviesStart())
        .put(
          favoritesActions.fetchMoreMoviesSuccess(convertResponseToMovieResults(getMoviesResponse)),
        )
        .run();
    });

    it('should fire fetchMoreMoviesStart and then fetchMoreMoviesFailure if error is thrown', () => {
      const errorMessage = 'some error message';
      expectSaga(favoritesSagas.fetchMoreMovies)
        .provide([
          [matchers.call.fn(loadingSelectors.createIsLoadingSelector), () => false],
          [select(authSelectors.selectSessionId), 'someSessionId'],
          [select(authSelectors.selectAccountId), 'someAccountId'],
          [select(favoritesSelectors.selectCurrentPage), 1],
          [select(favoritesSelectors.selectTotalPages), 3],
          [matchers.call.fn(api.getFavoriteMovies), throwError({ status_message: errorMessage })],
        ])
        .put(favoritesActions.fetchMoreMoviesStart())
        .put(favoritesActions.fetchMoreMoviesFailure(errorMessage))
        .run();
    });

    it('should not fire any actions if fetch more movies is loading', () => {
      expectSaga(favoritesSagas.fetchMoreMovies)
        .provide([
          [matchers.call.fn(loadingSelectors.createIsLoadingSelector), () => true],
          [select(authSelectors.selectSessionId), 'someSessionId'],
          [select(authSelectors.selectAccountId), 'someAccountId'],
          [select(favoritesSelectors.selectCurrentPage), 1],
          [select(favoritesSelectors.selectTotalPages), 3],
          [matchers.call.fn(api.getFavoriteMovies), { data: getMoviesResponse }],
        ])
        .run()
        .then(({ effects }) => {
          expect(effects.put).toBeUndefined();
        });
    });

    it('should not fire any actions if currentPage is greater than or equal to totalPages', () => {
      expectSaga(favoritesSagas.fetchMoreMovies)
        .provide([
          [matchers.call.fn(loadingSelectors.createIsLoadingSelector), () => false],
          [select(authSelectors.selectSessionId), 'someSessionId'],
          [select(authSelectors.selectAccountId), 'someAccountId'],
          [select(favoritesSelectors.selectCurrentPage), 3],
          [select(favoritesSelectors.selectTotalPages), 3],
          [matchers.call.fn(api.getFavoriteMovies), { data: getMoviesResponse }],
        ])
        .run()
        .then(({ effects }) => {
          expect(effects.put).toBeUndefined();
        });
    });
  });
});
