import { all, call, takeLatest, takeEvery, put, select } from 'redux-saga/effects';

import * as api from 'api/tmdb';
import { createIsLoadingSelector } from 'store/api/loading/loading.selectors';

import DiscoverMoviesActionTypes from './discover.types';
import {
  getDiscoverMoviesStart,
  getDiscoverMoviesSuccess,
  getDiscoverMoviesFailure,
  getMoreDiscoverMoviesStart,
  getMoreDiscoverMoviesSuccess,
  getMoreDiscoverMoviesFailure,
} from './discover.actions';
import {
  selectDiscoverMoviesCurrentPage,
  selectDiscoverMoviesTotalPages,
} from './discover.selectors';

export function* getDiscoverMovies() {
  yield put(getDiscoverMoviesStart());
  try {
    const { data } = yield api.getDiscoverMovies();
    yield put(getDiscoverMoviesSuccess(data));
  } catch (error) {
    yield put(getDiscoverMoviesFailure(error.status_message));
  }
}

export function* getMoreDiscoverMovies() {
  const isLoading = yield select(
    createIsLoadingSelector([
      DiscoverMoviesActionTypes.GET_DISCOVER_MOVIES,
      DiscoverMoviesActionTypes.GET_MORE_DISCOVER_MOVIES,
    ]),
  );
  const currentPage = yield select(selectDiscoverMoviesCurrentPage);
  const totalPages = yield select(selectDiscoverMoviesTotalPages);

  if (!isLoading && currentPage < totalPages) {
    yield put(getMoreDiscoverMoviesStart());
    try {
      const { data } = yield api.getDiscoverMovies({ page: currentPage + 1 });
      yield put(getMoreDiscoverMoviesSuccess(data));
    } catch (error) {
      yield put(getMoreDiscoverMoviesFailure(error.status_message));
    }
  }
}

export function* onGetDiscoverMovies() {
  yield takeLatest(DiscoverMoviesActionTypes.GET_DISCOVER_MOVIES, getDiscoverMovies);
}

export function* onGetMoreDiscoverMovies() {
  yield takeEvery(DiscoverMoviesActionTypes.GET_MORE_DISCOVER_MOVIES, getMoreDiscoverMovies);
}

export default function* discoverSagas() {
  yield all([call(onGetDiscoverMovies), call(onGetMoreDiscoverMovies)]);
}
