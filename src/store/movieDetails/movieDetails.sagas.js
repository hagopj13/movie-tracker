import { all, call, takeLatest, put } from 'redux-saga/effects';

import * as api from 'api/tmdb';

import MovieDetailsActionTypes from './movieDetails.types';
import movieDetailsActions from './movieDetails.actions';

function* fetchMovieDetails({ payload: { id } }) {
  yield put(movieDetailsActions.fetchMovieDetailsStart());
  try {
    const { data } = yield api.getMovieDetails(id);
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
