import { all, call, takeLatest, takeEvery, put, select } from 'redux-saga/effects';

import loadingSelectors from 'store/api/loading/loading.selectors';
import * as api from 'api/tmdb';
import { convertResponseToMovieResults } from 'api/tmdb/utils';

import SearchActionTypes from './search.types';
import searchActions from './search.actions';
import searchSelectors from './search.selectors';

export function* fetchMovies() {
  const query = yield select(searchSelectors.selectQuery);
  yield put(searchActions.fetchMoviesStart());
  try {
    const { data } = yield call(api.searchMovies, { query });
    const results = yield call(convertResponseToMovieResults, data);
    yield put(searchActions.fetchMoviesSuccess(results));
  } catch (error) {
    yield put(searchActions.fetchMoviesFailure(error.status_message));
  }
}

export function* fetchMoreMovies() {
  const query = yield select(searchSelectors.selectQuery);
  const selectIsLoading = yield call(loadingSelectors.createIsLoadingSelector, [
    SearchActionTypes.FETCH_MOVIES,
    SearchActionTypes.FETCH_MORE_MOVIES,
  ]);
  const isLoading = yield select(selectIsLoading);
  const currentPage = yield select(searchSelectors.selectCurrentPage);
  const totalPages = yield select(searchSelectors.selectTotalPages);

  if (!isLoading && currentPage < totalPages) {
    yield put(searchActions.fetchMoreMoviesStart());
    try {
      const { data } = yield call(api.searchMovies, { query, page: currentPage + 1 });
      const results = yield call(convertResponseToMovieResults, data);
      yield put(searchActions.fetchMoreMoviesSuccess(results));
    } catch (error) {
      yield put(searchActions.fetchMoreMoviesFailure(error.status_message));
    }
  }
}

export function* onFetchMovies() {
  yield takeLatest(SearchActionTypes.FETCH_MOVIES, fetchMovies);
}

export function* onFetchMoreMovies() {
  yield takeEvery(SearchActionTypes.FETCH_MORE_MOVIES, fetchMoreMovies);
}

export default function* searchSagas() {
  yield all([call(onFetchMovies), call(onFetchMoreMovies)]);
}
