import { all, call, takeLatest, takeEvery, put, select } from 'redux-saga/effects';

import * as api from 'api/tmdb';
import loadingSelectors from 'store/api/loading/loading.selectors';

import SearchActionTypes from './search.types';
import searchActions from './search.actions';
import searchSelectors from './search.selectors';

function* fetchMovies() {
  const query = yield select(searchSelectors.selectQuery);
  yield put(searchActions.fetchMoviesStart());
  try {
    const { data } = yield api.searchMovies({ query });
    yield put(searchActions.fetchMoviesSuccess(data));
  } catch (error) {
    yield put(searchActions.fetchMoviesFailure(error.status_message));
  }
}

function* fetchMoreMovies() {
  const query = yield select(searchSelectors.selectQuery);
  const isLoading = yield select(
    loadingSelectors.createIsLoadingSelector([
      SearchActionTypes.FETCH_MOVIES,
      SearchActionTypes.FETCH_MORE_MOVIES,
    ]),
  );
  const currentPage = yield select(searchSelectors.selectCurrentPage);
  const totalPages = yield select(searchSelectors.selectTotalPages);

  if (!isLoading && currentPage < totalPages) {
    yield put(searchActions.fetchMoreMoviesStart());
    try {
      const { data } = yield api.searchMovies({ query, page: currentPage + 1 });
      yield put(searchActions.fetchMoreMoviesSuccess(data));
    } catch (error) {
      yield put(searchActions.fetchMoreMoviesFailure(error.status_message));
    }
  }
}

function* onFetchMovies() {
  yield takeLatest(SearchActionTypes.FETCH_MOVIES, fetchMovies);
}

function* onFetchMoreMovies() {
  yield takeEvery(SearchActionTypes.FETCH_MORE_MOVIES, fetchMoreMovies);
}

export default function* searchSagas() {
  yield all([call(onFetchMovies), call(onFetchMoreMovies)]);
}
