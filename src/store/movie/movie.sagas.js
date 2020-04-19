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

function* onFetchMovie() {
  yield takeLatest(MovieActionTypes.FETCH_MOVIE, fetchMovie);
}

export default function* movieSagas() {
  yield all([call(onFetchMovie)]);
}
