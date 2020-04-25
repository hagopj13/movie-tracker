import { all, call, takeLatest, takeEvery, put, select } from 'redux-saga/effects';

import * as api from 'api/tmdb';
import loadingSelectors from 'store/api/loading/loading.selectors';

import UpcomingActionTypes from './upcoming.types';
import upcomingActions from './upcoming.actions';
import upcomingSelectors from './upcoming.selectors';

function* fetchMovies() {
  yield put(upcomingActions.fetchMoviesStart());
  try {
    const { data } = yield call(api.getUpcomingMovies, {});
    yield put(upcomingActions.fetchMoviesSuccess(data));
  } catch (error) {
    yield put(upcomingActions.fetchMoviesFailure(error.status_message));
  }
}

function* fetchMoreMovies() {
  const isLoading = yield select(
    loadingSelectors.createIsLoadingSelector([
      UpcomingActionTypes.FETCH_MOVIES,
      UpcomingActionTypes.FETCH_MORE_MOVIES,
    ]),
  );
  const currentPage = yield select(upcomingSelectors.selectCurrentPage);
  const totalPages = yield select(upcomingSelectors.selectTotalPages);

  if (!isLoading && currentPage < totalPages) {
    yield put(upcomingActions.fetchMoreMoviesStart());
    try {
      const { data } = yield call(api.getUpcomingMovies, { page: currentPage + 1 });
      yield put(upcomingActions.fetchMoreMoviesSuccess(data));
    } catch (error) {
      yield put(upcomingActions.fetchMoreMoviesFailure(error.status_message));
    }
  }
}

function* onFetchMovies() {
  yield takeLatest(UpcomingActionTypes.FETCH_MOVIES, fetchMovies);
}

function* onFetchMoreMovies() {
  yield takeEvery(UpcomingActionTypes.FETCH_MORE_MOVIES, fetchMoreMovies);
}

export default function* upcomingSagas() {
  yield all([call(onFetchMovies), call(onFetchMoreMovies)]);
}
