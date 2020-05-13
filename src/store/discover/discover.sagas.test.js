import moment from 'moment';

import { select } from 'redux-saga/effects';
import { testSaga, expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import loadingSelectors from 'store/api/loading/loading.selectors';
import * as api from 'api/tmdb';
import getMoviesResponse from 'api/tmdb/fixtures/getMoviesResponse';
import { convertResponseToMovieResults } from 'api/tmdb/utils';

import * as discoverSagas from './discover.sagas';
import discoverActions from './discover.actions';
import discoverSelectors from './discover.selectors';
import DiscoverActionTypes from './discover.types';

describe('Discover sagas', () => {
  describe('onFetchMovies saga', () => {
    it('should trigger on FETCH_MOVIES', () => {
      testSaga(discoverSagas.onFetchMovies)
        .next()
        .takeLatest(DiscoverActionTypes.FETCH_MOVIES, discoverSagas.fetchMovies);
    });
  });

  describe('onFetchMoreMovies saga', () => {
    it('should trigger on FETCH_MORE_MOVIES', () => {
      testSaga(discoverSagas.onFetchMoreMovies)
        .next()
        .takeEvery(DiscoverActionTypes.FETCH_MORE_MOVIES, discoverSagas.fetchMoreMovies);
    });
  });

  describe('fetchMovies saga', () => {
    it('should fire fetchMoviesStart and then fetchMoviesSuccess if movies are fetched', () => {
      expectSaga(discoverSagas.fetchMovies)
        .provide([
          [matchers.call.fn(discoverSagas.getFilterParams), {}],
          [matchers.call.fn(api.getDiscoverMovies), { data: getMoviesResponse }],
        ])
        .put(discoverActions.fetchMoviesStart())
        .put(discoverActions.fetchMoviesSuccess(convertResponseToMovieResults(getMoviesResponse)))
        .run();
    });

    it('should fire fetchMoviesStart and then fetchMoviesFailure if error is thrown', () => {
      const errorMessage = 'some error message';
      expectSaga(discoverSagas.fetchMovies)
        .provide([
          [matchers.call.fn(discoverSagas.getFilterParams), {}],
          [matchers.call.fn(api.getDiscoverMovies), throwError({ status_message: errorMessage })],
        ])
        .put(discoverActions.fetchMoviesStart())
        .put(discoverActions.fetchMoviesFailure(errorMessage))
        .run();
    });
  });

  describe('fetchMoreMovies saga', () => {
    it('should fire fetchMoreMoviesStart and then fetchMoreMoviesSuccess if more movies are fetched', () => {
      expectSaga(discoverSagas.fetchMoreMovies)
        .provide([
          [matchers.call.fn(loadingSelectors.createIsLoadingSelector), () => false],
          [select(discoverSelectors.selectCurrentPage), 1],
          [select(discoverSelectors.selectTotalPages), 3],
          [matchers.call.fn(discoverSagas.getFilterParams), {}],
          [matchers.call.fn(api.getDiscoverMovies), { data: getMoviesResponse }],
        ])
        .put(discoverActions.fetchMoreMoviesStart())
        .put(
          discoverActions.fetchMoreMoviesSuccess(convertResponseToMovieResults(getMoviesResponse)),
        )
        .run();
    });

    it('should fire fetchMoreMoviesStart and then fetchMoreMoviesFailure if error is thrown', () => {
      const errorMessage = 'some error message';
      expectSaga(discoverSagas.fetchMoreMovies)
        .provide([
          [matchers.call.fn(loadingSelectors.createIsLoadingSelector), () => false],
          [select(discoverSelectors.selectCurrentPage), 1],
          [select(discoverSelectors.selectTotalPages), 3],
          [matchers.call.fn(discoverSagas.getFilterParams), {}],
          [matchers.call.fn(api.getDiscoverMovies), throwError({ status_message: errorMessage })],
        ])
        .put(discoverActions.fetchMoreMoviesStart())
        .put(discoverActions.fetchMoreMoviesFailure(errorMessage))
        .run();
    });

    it('should not fire any actions if fetch more movies is loading', () => {
      expectSaga(discoverSagas.fetchMoreMovies)
        .provide([
          [matchers.call.fn(loadingSelectors.createIsLoadingSelector), () => true],
          [select(discoverSelectors.selectCurrentPage), 1],
          [select(discoverSelectors.selectTotalPages), 3],
          [matchers.call.fn(discoverSagas.getFilterParams), {}],
          [matchers.call.fn(api.getDiscoverMovies), { data: getMoviesResponse }],
        ])
        .run()
        .then(({ effects }) => {
          expect(effects.put).toBeUndefined();
        });
    });

    it('should not fire any actions if current page is greater than or equal to totalPages', () => {
      expectSaga(discoverSagas.fetchMoreMovies)
        .provide([
          [matchers.call.fn(loadingSelectors.createIsLoadingSelector), () => false],
          [select(discoverSelectors.selectCurrentPage), 3],
          [select(discoverSelectors.selectTotalPages), 3],
          [matchers.call.fn(discoverSagas.getFilterParams), {}],
          [matchers.call.fn(api.getDiscoverMovies), { data: getMoviesResponse }],
        ])
        .run()
        .then(({ effects }) => {
          expect(effects.put).toBeUndefined();
        });
    });
  });

  describe('getFilterParams saga', () => {
    it('should return the filter params if they are defined', () => {
      const sortBy = 'someSortBy';
      const genres = [1, 2, 3];
      const releaseDateStart = moment();
      const releaseDateEnd = moment();
      expectSaga(discoverSagas.getFilterParams)
        .provide([
          [select(discoverSelectors.selectSortBy), sortBy],
          [select(discoverSelectors.selectGenres), genres],
          [select(discoverSelectors.selectReleaseDateStart), releaseDateStart],
          [select(discoverSelectors.selectReleaseDateEnd), releaseDateEnd],
        ])
        .returns({
          sort_by: sortBy,
          with_genres: genres.join(','),
          'primary_release_date.gte': releaseDateStart.format('YYYY-MM-DD'),
          'primary_release_date.lte': releaseDateEnd.format('YYYY-MM-DD'),
        })
        .run();
    });

    it('should return only the sort filter param if the others are not defined', () => {
      const sortBy = 'someSortBy';
      expectSaga(discoverSagas.getFilterParams)
        .provide([
          [select(discoverSelectors.selectSortBy), sortBy],
          [select(discoverSelectors.selectGenres), []],
          [select(discoverSelectors.selectReleaseDateStart), null],
          [select(discoverSelectors.selectReleaseDateEnd), null],
        ])
        .returns({
          sort_by: sortBy,
        })
        .run();
    });

    it('should also add a minimum vote count to the filter params if it is sorted by vote average', () => {
      const sortBy = 'vote_average';
      expectSaga(discoverSagas.getFilterParams)
        .provide([
          [select(discoverSelectors.selectSortBy), sortBy],
          [select(discoverSelectors.selectGenres), []],
          [select(discoverSelectors.selectReleaseDateStart), null],
          [select(discoverSelectors.selectReleaseDateEnd), null],
        ])
        .returns({
          sort_by: sortBy,
          'vote_count.gte': 100,
        })
        .run();
    });
  });
});
