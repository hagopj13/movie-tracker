import { all, call, takeLatest, put, select } from 'redux-saga/effects';

import * as api from 'api/tmdb';
import authSelectors from 'store/auth/auth.selectors';

import MovieDetailsActionTypes from './movieDetails.types';
import movieDetailsActions from './movieDetails.actions';

function* fetchMovieDetails({ payload: { id } }) {
  yield put(movieDetailsActions.fetchMovieDetailsStart());
  const sessionId = yield select(authSelectors.selectSessionId);
  try {
    const { data } = yield api.getMovieDetails(id, sessionId);
    yield put(movieDetailsActions.fetchMovieDetailsSuccess(data));
  } catch (error) {
    yield put(movieDetailsActions.fetchMovieDetailsFailure(error.status_message));
  }
}

function* onFetchMovieDetails() {
  yield takeLatest(MovieDetailsActionTypes.FETCH_MOVIE_DETAILS, fetchMovieDetails);
}

export default function* movieDetailsSagas() {
  yield all([call(onFetchMovieDetails)]);
}
