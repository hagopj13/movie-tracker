import { all, call, takeLatest, takeEvery, put, select } from 'redux-saga/effects';

import loadingSelectors from 'store/api/loading/loading.selectors';
import * as api from 'api/tmdb';
import { convertResponseToMovieResults } from 'api/tmdb/utils';

import UpcomingActionTypes from './upcoming.types';
import upcomingActions from './upcoming.actions';
import upcomingSelectors from './upcoming.selectors';

export function* fetchMovies() {
  yield put(upcomingActions.fetchMoviesStart());
  try {
    const { data } = yield call(api.getUpcomingMovies, {});
    const results = yield call(convertResponseToMovieResults, data);
    yield put(upcomingActions.fetchMoviesSuccess(results));
  } catch (error) {
    yield put(upcomingActions.fetchMoviesFailure(error.status_message));
  }
}

export function* fetchMoreMovies() {
  const selectIsLoading = yield call(loadingSelectors.createIsLoadingSelector, [
    UpcomingActionTypes.FETCH_MOVIES,
    UpcomingActionTypes.FETCH_MORE_MOVIES,
  ]);
  const isLoading = yield select(selectIsLoading);
  const currentPage = yield select(upcomingSelectors.selectCurrentPage);
  const totalPages = yield select(upcomingSelectors.selectTotalPages);

  if (!isLoading && currentPage < totalPages) {
    yield put(upcomingActions.fetchMoreMoviesStart());
    try {
      const { data } = yield call(api.getUpcomingMovies, { page: currentPage + 1 });
      const results = yield call(convertResponseToMovieResults, data);
      yield put(upcomingActions.fetchMoreMoviesSuccess(results));
    } catch (error) {
      yield put(upcomingActions.fetchMoreMoviesFailure(error.status_message));
    }
  }
}

export function* onFetchMovies() {
  yield takeLatest(UpcomingActionTypes.FETCH_MOVIES, fetchMovies);
}

export function* onFetchMoreMovies() {
  yield takeEvery(UpcomingActionTypes.FETCH_MORE_MOVIES, fetchMoreMovies);
}

export default function* upcomingSagas() {
  yield all([call(onFetchMovies), call(onFetchMoreMovies)]);
}
