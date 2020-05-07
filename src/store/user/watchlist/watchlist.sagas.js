import { all, call, takeLatest, takeEvery, put, select } from 'redux-saga/effects';

import loadingSelectors from 'store/api/loading/loading.selectors';
import authSelectors from 'store/auth/auth.selectors';
import * as api from 'api/tmdb';
import { convertResponseToMovieResults } from 'api/tmdb/utils';

import WatchlistActionTypes from './watchlist.types';
import watchlistActions from './watchlist.actions';
import watchlistSelectors from './watchlist.selectors';

export function* fetchMovies() {
  yield put(watchlistActions.fetchMoviesStart());
  const sessionId = yield select(authSelectors.selectSessionId);
  const accountId = yield select(authSelectors.selectAccountId);
  try {
    const { data } = yield call(api.getWatchlistMovies, sessionId, accountId, {
      sort_by: 'created_at.desc',
    });
    const results = yield call(convertResponseToMovieResults, data);
    yield put(watchlistActions.fetchMoviesSuccess(results));
  } catch (error) {
    yield put(watchlistActions.fetchMoviesFailure(error.status_message));
  }
}

export function* fetchMoreMovies() {
  const selectIsLoading = yield call(loadingSelectors.createIsLoadingSelector, [
    WatchlistActionTypes.FETCH_MOVIES,
    WatchlistActionTypes.FETCH_MORE_MOVIES,
  ]);
  const isLoading = yield select(selectIsLoading);
  const sessionId = yield select(authSelectors.selectSessionId);
  const accountId = yield select(authSelectors.selectAccountId);
  const currentPage = yield select(watchlistSelectors.selectCurrentPage);
  const totalPages = yield select(watchlistSelectors.selectTotalPages);

  if (!isLoading && currentPage < totalPages) {
    yield put(watchlistActions.fetchMoreMoviesStart());
    try {
      const { data } = yield call(api.getWatchlistMovies, sessionId, accountId, {
        sort_by: 'created_at.desc',
        page: currentPage + 1,
      });
      const results = yield call(convertResponseToMovieResults, data);
      yield put(watchlistActions.fetchMoreMoviesSuccess(results));
    } catch (error) {
      yield put(watchlistActions.fetchMoreMoviesFailure(error.status_message));
    }
  }
}

export function* onFetchMovies() {
  yield takeLatest(WatchlistActionTypes.FETCH_MOVIES, fetchMovies);
}

export function* onFetchMoreMovies() {
  yield takeEvery(WatchlistActionTypes.FETCH_MORE_MOVIES, fetchMoreMovies);
}

export default function* watchlistSagas() {
  yield all([call(onFetchMovies), call(onFetchMoreMovies)]);
}
