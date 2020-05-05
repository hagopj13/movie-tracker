import { all, call, takeLatest, put, select } from 'redux-saga/effects';

import * as api from 'api/tmdb';
import authSelectors from 'store/auth/auth.selectors';
import { convertResponseToMovie, convertResponseToMovieUserState } from 'api/tmdb/utils';

import MovieActionTypes from './movie.types';
import movieActions from './movie.actions';

export function* fetchMovie({ payload: { id } }) {
  yield put(movieActions.fetchMovieStart());
  const sessionId = yield select(authSelectors.selectSessionId);
  try {
    const { data } = yield call(api.getMovieDetails, id, sessionId);
    const movie = yield call(convertResponseToMovie, data);
    const movieUserState = yield call(convertResponseToMovieUserState, data.account_states);
    yield put(movieActions.fetchMovieSuccess(movie, movieUserState));
  } catch (error) {
    yield put(movieActions.fetchMovieFailure(error.status_message));
  }
}

export function* fetchMovieUserState({ payload: { id } }) {
  yield put(movieActions.fetchMovieUserStateStart());
  const sessionId = yield select(authSelectors.selectSessionId);
  try {
    const { data } = yield call(api.getMovieUserState, id, sessionId);
    const movieUserState = yield call(convertResponseToMovieUserState, data);
    yield put(movieActions.fetchMovieUserStateSuccess(movieUserState));
  } catch (error) {
    yield put(movieActions.fetchMovieUserStateFailure(error.status_message));
  }
}

export function* setIsMovieFavorite({ payload: { id, isFavorite } }) {
  yield put(movieActions.setIsMovieFavoriteStart());
  const sessionId = yield select(authSelectors.selectSessionId);
  const accountId = yield select(authSelectors.selectAccountId);
  try {
    yield call(api.setIsMovieFavorite, id, isFavorite, sessionId, accountId);
    yield put(movieActions.setIsMovieFavoriteSuccess(id, isFavorite));
  } catch (error) {
    yield put(movieActions.setIsMovieFavoriteFailure(error.status_message));
  }
}

export function* setIsMovieInWatchlist({ payload: { id, isInWatchlist } }) {
  yield put(movieActions.setIsMovieInWatchlistStart());
  const sessionId = yield select(authSelectors.selectSessionId);
  const accountId = yield select(authSelectors.selectAccountId);
  try {
    yield call(api.setIsMovieInWatchlist, id, isInWatchlist, sessionId, accountId);
    yield put(movieActions.setIsMovieInWatchlistSuccess(id, isInWatchlist));
  } catch (error) {
    yield put(movieActions.setIsMovieInWatchlistFailure(error.status_message));
  }
}

export function* rateMovie({ payload: { id, rating } }) {
  yield put(movieActions.rateMovieStart());
  const sessionId = yield select(authSelectors.selectSessionId);
  try {
    if (rating) {
      yield call(api.rateMovie, id, rating * 2, sessionId);
    } else {
      yield call(api.deleteMovieRating, id, sessionId);
    }
    yield put(movieActions.rateMovieSuccess(id, rating));
  } catch (error) {
    yield put(movieActions.rateMovieFailure(error.status_message));
  }
}

export function* onFetchMovie() {
  yield takeLatest(MovieActionTypes.FETCH_MOVIE, fetchMovie);
}

export function* onFetchMovieUserState() {
  yield takeLatest(MovieActionTypes.FETCH_MOVIE_USER_STATE, fetchMovieUserState);
}

export function* onSetIsMovieFavorite() {
  yield takeLatest(MovieActionTypes.SET_IS_MOVIE_FAVORITE, setIsMovieFavorite);
}

export function* onSetIsMovieInWatchlist() {
  yield takeLatest(MovieActionTypes.SET_IS_MOVIE_IN_WATCHLIST, setIsMovieInWatchlist);
}

export function* onRateMovie() {
  yield takeLatest(MovieActionTypes.RATE_MOVIE, rateMovie);
}

export default function* movieSagas() {
  yield all([
    call(onFetchMovie),
    call(onFetchMovieUserState),
    call(onSetIsMovieFavorite),
    call(onSetIsMovieInWatchlist),
    call(onRateMovie),
  ]);
}
