import { all, call, takeLatest, takeEvery, put, select } from 'redux-saga/effects';

import * as api from 'api/tmdb';
import loadingSelectors from 'store/api/loading/loading.selectors';
import authSelectors from 'store/auth/auth.selectors';

import WatchlistActionTypes from './watchlist.types';
import watchlistActions from './watchlist.actions';
import watchlistSelectors from './watchlist.selectors';

function* fetchMovies() {
  yield put(watchlistActions.fetchMoviesStart());
  const sessionId = yield select(authSelectors.selectSessionId);
  const accountId = yield select(authSelectors.selectAccountId);
  try {
    const { data } = yield call(api.getWatchlistMovies, sessionId, accountId, {
      sort_by: 'created_at.desc',
    });
    yield put(watchlistActions.fetchMoviesSuccess(data));
  } catch (error) {
    yield put(watchlistActions.fetchMoviesFailure(error.status_message));
  }
}

function* fetchMoreMovies() {
  const isLoading = yield select(
    loadingSelectors.createIsLoadingSelector([
      WatchlistActionTypes.FETCH_MOVIES,
      WatchlistActionTypes.FETCH_MORE_MOVIES,
    ]),
  );
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
      yield put(watchlistActions.fetchMoreMoviesSuccess(data));
    } catch (error) {
      yield put(watchlistActions.fetchMoreMoviesFailure(error.status_message));
    }
  }
}

function* onFetchMovies() {
  yield takeLatest(WatchlistActionTypes.FETCH_MOVIES, fetchMovies);
}

function* onFetchMoreMovies() {
  yield takeEvery(WatchlistActionTypes.FETCH_MORE_MOVIES, fetchMoreMovies);
}

export default function* watchlistSagas() {
  yield all([call(onFetchMovies), call(onFetchMoreMovies)]);
}
