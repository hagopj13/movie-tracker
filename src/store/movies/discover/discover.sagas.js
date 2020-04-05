import { all, call, takeLatest, put } from 'redux-saga/effects';

import * as api from 'api/tmdb';

import DiscoverMoviesActionTypes from './discover.types';
import {
  getDiscoverMoviesStart,
  getDiscoverMoviesSuccess,
  getDiscoverMoviesFailure,
} from './discover.actions';

export function* getDiscoverMovies() {
  yield put(getDiscoverMoviesStart());
  try {
    const { data } = yield api.getDiscoverMovies();
    yield put(getDiscoverMoviesSuccess(data));
  } catch (error) {
    yield put(getDiscoverMoviesFailure(error.status_message));
  }
}

export function* onGetDiscoverMovies() {
  yield takeLatest(DiscoverMoviesActionTypes.GET_DISCOVER_MOVIES, getDiscoverMovies);
}

export default function* discoverSagas() {
  yield all([call(onGetDiscoverMovies)]);
}
