import { all, call, takeLatest, takeEvery, put, select } from 'redux-saga/effects';

import * as api from 'api/tmdb';
import loadingSelectors from 'store/api/loading/loading.selectors';
import authSelectors from 'store/auth/auth.selectors';

import FavoritesActionTypes from './favorites.types';
import favoritesActions from './favorites.actions';
import favoritesSelectors from './favorites.selectors';

function* fetchMovies() {
  yield put(favoritesActions.fetchMoviesStart());
  const sessionId = yield select(authSelectors.selectSessionId);
  const accountId = yield select(authSelectors.selectAccountId);
  try {
    const { data } = yield call(api.getFavoriteMovies, sessionId, accountId, {
      sortBy: 'created_at.desc',
    });
    yield put(favoritesActions.fetchMoviesSuccess(data));
  } catch (error) {
    yield put(favoritesActions.fetchMoviesFailure(error.status_message));
  }
}

function* fetchMoreMovies() {
  const isLoading = yield select(
    loadingSelectors.createIsLoadingSelector([
      FavoritesActionTypes.FETCH_MOVIES,
      FavoritesActionTypes.FETCH_MORE_MOVIES,
    ]),
  );
  const sessionId = yield select(authSelectors.selectSessionId);
  const accountId = yield select(authSelectors.selectAccountId);
  const currentPage = yield select(favoritesSelectors.selectCurrentPage);
  const totalPages = yield select(favoritesSelectors.selectTotalPages);

  if (!isLoading && currentPage < totalPages) {
    yield put(favoritesActions.fetchMoreMoviesStart());
    try {
      const { data } = yield call(api.getFavoriteMovies, sessionId, accountId, {
        sortBy: 'created_at.desc',
        page: currentPage + 1,
      });
      yield put(favoritesActions.fetchMoreMoviesSuccess(data));
    } catch (error) {
      yield put(favoritesActions.fetchMoreMoviesFailure(error.status_message));
    }
  }
}

function* onFetchMovies() {
  yield takeLatest(FavoritesActionTypes.FETCH_MOVIES, fetchMovies);
}

function* onFetchMoreMovies() {
  yield takeEvery(FavoritesActionTypes.FETCH_MORE_MOVIES, fetchMoreMovies);
}

export default function* favoritesSagas() {
  yield all([call(onFetchMovies), call(onFetchMoreMovies)]);
}
