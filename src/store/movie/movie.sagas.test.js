import { select } from 'redux-saga/effects';
import { testSaga, expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import authSelectors from 'store/auth/auth.selectors';
import * as api from 'api/tmdb';
import getMovieDetailsResponse from 'api/tmdb/fixtures/getMovieDetailsResponse';
import getMovieUserStateResponse from 'api/tmdb/fixtures/getMovieUserStateResponse';
import { convertResponseToMovie, convertResponseToMovieUserState } from 'api/tmdb/utils';

import * as movieSagas from './movie.sagas';
import movieActions from './movie.actions';
import MovieActionTypes from './movie.types';

describe('Movie sagas', () => {
  describe('onFetchMovie saga', () => {
    it('should trigger on FETCH_MOVIE', () => {
      testSaga(movieSagas.onFetchMovie)
        .next()
        .takeLatest(MovieActionTypes.FETCH_MOVIE, movieSagas.fetchMovie);
    });
  });

  describe('onFetchMovieUserState saga', () => {
    it('should trigger on FETCH_MOVIE_USER_STATE', () => {
      testSaga(movieSagas.onFetchMovieUserState)
        .next()
        .takeLatest(MovieActionTypes.FETCH_MOVIE_USER_STATE, movieSagas.fetchMovieUserState);
    });
  });

  describe('onSetIsMovieFavorite saga', () => {
    it('should trigger on SET_IS_MOVIE_FAVORITE', () => {
      testSaga(movieSagas.onSetIsMovieFavorite)
        .next()
        .takeLatest(MovieActionTypes.SET_IS_MOVIE_FAVORITE, movieSagas.setIsMovieFavorite);
    });
  });

  describe('onSetIsMovieInWatchlist saga', () => {
    it('should trigger on SET_IS_MOVIE_IN_WATCHLIST', () => {
      testSaga(movieSagas.onSetIsMovieInWatchlist)
        .next()
        .takeLatest(MovieActionTypes.SET_IS_MOVIE_IN_WATCHLIST, movieSagas.setIsMovieInWatchlist);
    });
  });

  describe('onRateMovie saga', () => {
    it('should trigger on RATE_MOVIE', () => {
      testSaga(movieSagas.onRateMovie)
        .next()
        .takeLatest(MovieActionTypes.RATE_MOVIE, movieSagas.rateMovie);
    });
  });

  describe('fetchMovie saga', () => {
    it('should fire fetchMovieStart and then fetchMovieSuccess if movie is fetched', () => {
      const action = { payload: { id: 'someMovieId' } };
      expectSaga(movieSagas.fetchMovie, action)
        .provide([
          [select(authSelectors.selectSessionId), 'someSessionId'],
          [matchers.call.fn(api.getMovieDetails), { data: getMovieDetailsResponse }],
        ])
        .put(movieActions.fetchMovieStart())
        .put(
          movieActions.fetchMovieSuccess(
            convertResponseToMovie(getMovieDetailsResponse),
            convertResponseToMovieUserState(getMovieDetailsResponse.account_states),
          ),
        )
        .run();
    });

    it('should fire fetchMovieStart and then fetchMovieFailure if error is thrown', () => {
      const action = { payload: { id: 'someMovieId' } };
      const errorMessage = 'some error message';
      expectSaga(movieSagas.fetchMovie, action)
        .provide([
          [select(authSelectors.selectSessionId), 'someSessionId'],
          [matchers.call.fn(api.getMovieDetails), throwError({ status_message: errorMessage })],
        ])
        .put(movieActions.fetchMovieStart())
        .put(movieActions.fetchMovieFailure(errorMessage))
        .run();
    });
  });

  describe('fetchMovieUserState saga', () => {
    it('should fire fetchMovieUserStateStart and then fetchMovieUserStateSuccess if movie user state is fetched', () => {
      const action = { payload: { id: 'someMovieId' } };
      expectSaga(movieSagas.fetchMovieUserState, action)
        .provide([
          [select(authSelectors.selectSessionId), 'someSessionId'],
          [matchers.call.fn(api.getMovieUserState), { data: getMovieUserStateResponse }],
        ])
        .put(movieActions.fetchMovieUserStateStart())
        .put(
          movieActions.fetchMovieUserStateSuccess(
            convertResponseToMovieUserState(getMovieUserStateResponse),
          ),
        )
        .run();
    });

    it('should fire fetchMovieUserStateStart and then fetchMovieUserStateFailure if error is thrown', () => {
      const action = { payload: { id: 'someMovieId' } };
      const errorMessage = 'some error message';
      expectSaga(movieSagas.fetchMovieUserState, action)
        .provide([
          [select(authSelectors.selectSessionId), 'someSessionId'],
          [matchers.call.fn(api.getMovieUserState), throwError({ status_message: errorMessage })],
        ])
        .put(movieActions.fetchMovieUserStateStart())
        .put(movieActions.fetchMovieUserStateFailure(errorMessage))
        .run();
    });
  });

  describe('setIsMovieFavorite saga', () => {
    it('should fire setIsMovieFavoriteStart and then setIsMovieFavoriteSuccess if no errors are thrown', () => {
      const id = 'someMovieId';
      const isFavorite = true;
      const action = { payload: { id, isFavorite } };
      expectSaga(movieSagas.setIsMovieFavorite, action)
        .provide([
          [select(authSelectors.selectSessionId), 'someSessionId'],
          [select(authSelectors.selectAccountId), 'someAccountId'],
          [matchers.call.fn(api.setIsMovieFavorite), {}],
        ])
        .put(movieActions.setIsMovieFavoriteStart())
        .put(movieActions.setIsMovieFavoriteSuccess(id, isFavorite))
        .run();
    });

    it('should fire setIsMovieFavoriteStart and then setIsMovieFavoriteFailure if error is thrown', () => {
      const id = 'someMovieId';
      const isFavorite = true;
      const action = { payload: { id, isFavorite } };
      const errorMessage = 'some error message';
      expectSaga(movieSagas.setIsMovieFavorite, action)
        .provide([
          [select(authSelectors.selectSessionId), 'someSessionId'],
          [select(authSelectors.selectAccountId), 'someAccountId'],
          [matchers.call.fn(api.setIsMovieFavorite), throwError({ status_message: errorMessage })],
        ])
        .put(movieActions.setIsMovieFavoriteStart())
        .put(movieActions.setIsMovieFavoriteFailure(errorMessage))
        .run();
    });
  });

  describe('setIsMovieInWatchlist saga', () => {
    it('should fire setIsMovieInWatchlistStart and then setIsMovieInWatchlistSuccess if no errors are thrown', () => {
      const id = 'someMovieId';
      const isInWatchlist = true;
      const action = { payload: { id, isInWatchlist } };
      expectSaga(movieSagas.setIsMovieInWatchlist, action)
        .provide([
          [select(authSelectors.selectSessionId), 'someSessionId'],
          [select(authSelectors.selectAccountId), 'someAccountId'],
          [matchers.call.fn(api.setIsMovieInWatchlist), {}],
        ])
        .put(movieActions.setIsMovieInWatchlistStart())
        .put(movieActions.setIsMovieInWatchlistSuccess(id, isInWatchlist))
        .run();
    });

    it('should fire setIsMovieInWatchlistStart and then setIsMovieInWatchlistFailure if error is thrown', () => {
      const id = 'someMovieId';
      const isInWatchlist = true;
      const action = { payload: { id, isInWatchlist } };
      const errorMessage = 'some error message';
      expectSaga(movieSagas.setIsMovieInWatchlist, action)
        .provide([
          [select(authSelectors.selectSessionId), 'someSessionId'],
          [select(authSelectors.selectAccountId), 'someAccountId'],
          [
            matchers.call.fn(api.setIsMovieInWatchlist),
            throwError({ status_message: errorMessage }),
          ],
        ])
        .put(movieActions.setIsMovieInWatchlistStart())
        .put(movieActions.setIsMovieInWatchlistFailure(errorMessage))
        .run();
    });
  });

  describe('rateMovie saga', () => {
    it('should fire rateMovieStart, call the rateMovie api and then rateMovieSuccess if new rating is not null and no errors are thrown', () => {
      const id = 'someMovieId';
      const rating = 5;
      const action = { payload: { id, rating } };
      expectSaga(movieSagas.rateMovie, action)
        .provide([
          [select(authSelectors.selectSessionId), 'someSessionId'],
          [select(authSelectors.selectAccountId), 'someAccountId'],
          [matchers.call.fn(api.rateMovie), {}],
        ])
        .put(movieActions.rateMovieStart())
        .put(movieActions.rateMovieSuccess(id, rating))
        .run();
    });

    it('should fire rateMovieStart, call the deleteMovieRating api and then rateMovieSuccess if new rating is null and no errors are thrown', () => {
      const id = 'someMovieId';
      const rating = null;
      const action = { payload: { id, rating } };
      expectSaga(movieSagas.rateMovie, action)
        .provide([
          [select(authSelectors.selectSessionId), 'someSessionId'],
          [select(authSelectors.selectAccountId), 'someAccountId'],
          [matchers.call.fn(api.deleteMovieRating), {}],
        ])
        .put(movieActions.rateMovieStart())
        .put(movieActions.rateMovieSuccess(id, rating))
        .run();
    });

    it('should fire rateMovieStart and then rateMovieFailure if error is thrown', () => {
      const id = 'someMovieId';
      const rating = true;
      const action = { payload: { id, rating } };
      const errorMessage = 'some error message';
      expectSaga(movieSagas.rateMovie, action)
        .provide([
          [select(authSelectors.selectSessionId), 'someSessionId'],
          [select(authSelectors.selectAccountId), 'someAccountId'],
          [matchers.call.fn(api.rateMovie), throwError({ status_message: errorMessage })],
        ])
        .put(movieActions.rateMovieStart())
        .put(movieActions.rateMovieFailure(errorMessage))
        .run();
    });
  });
});
