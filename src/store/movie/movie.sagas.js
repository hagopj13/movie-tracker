import { all, call, takeLatest, put, select } from 'redux-saga/effects';

import * as api from 'api/tmdb';
import authSelectors from 'store/auth/auth.selectors';

import MovieActionTypes from './movie.types';
import movieActions from './movie.actions';

function* fetchMovie({ payload: { id } }) {
  yield put(movieActions.fetchMovieStart());
  const sessionId = yield select(authSelectors.selectSessionId);
  try {
    const { data } = yield api.getMovieDetails(id, sessionId);
    yield put(movieActions.fetchMovieSuccess(data));
  } catch (error) {
    yield put(movieActions.fetchMovieFailure(error.status_message));
  }
}

function* setIsMovieFavorite({ payload: { id, isFavorite } }) {
  yield put(movieActions.setIsMovieFavoriteStart());
  const sessionId = yield select(authSelectors.selectSessionId);
  try {
    yield api.setIsMovieFavorite(id, isFavorite, sessionId);
    yield put(movieActions.setIsMovieFavoriteSuccess(id, isFavorite));
  } catch (error) {
    yield put(movieActions.setIsMovieFavoriteFailure(error.status_message));
  }
}

function* setIsMovieInWatchlist({ payload: { id, isInWatchlist } }) {
  yield put(movieActions.setIsMovieInWatchlistStart());
  const sessionId = yield select(authSelectors.selectSessionId);
  try {
    yield api.setIsMovieInWatchlist(id, isInWatchlist, sessionId);
    yield put(movieActions.setIsMovieInWatchlistSuccess(id, isInWatchlist));
  } catch (error) {
    yield put(movieActions.setIsMovieInWatchlistFailure(error.status_message));
  }
}

function* rateMovie({ payload: { id, rating } }) {
  yield put(movieActions.rateMovieStart());
  const sessionId = yield select(authSelectors.selectSessionId);
  try {
    if (rating) {
      yield api.rateMovie(id, rating, sessionId);
    } else {
      yield api.deleteMovieRating(id, sessionId);
    }
    yield put(movieActions.rateMovieSuccess(id, rating));
  } catch (error) {
    yield put(movieActions.rateMovieFailure(error.status_message));
  }
}

function* onFetchMovie() {
  yield takeLatest(MovieActionTypes.FETCH_MOVIE, fetchMovie);
}

function* onSetIsMovieFavorite() {
  yield takeLatest(MovieActionTypes.SET_IS_MOVIE_FAVORITE, setIsMovieFavorite);
}

function* onSetIsMovieInWatchlist() {
  yield takeLatest(MovieActionTypes.SET_IS_MOVIE_IN_WATCHLIST, setIsMovieInWatchlist);
}

function* onRateMovie() {
  yield takeLatest(MovieActionTypes.RATE_MOVIE, rateMovie);
}

export default function* movieSagas() {
  yield all([
    call(onFetchMovie),
    call(onSetIsMovieFavorite),
    call(onSetIsMovieInWatchlist),
    call(onRateMovie),
  ]);
}
