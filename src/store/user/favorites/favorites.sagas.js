import { all, call, takeLatest, takeEvery, put, select } from 'redux-saga/effects';

import loadingSelectors from 'store/api/loading/loading.selectors';
import authSelectors from 'store/auth/auth.selectors';
import * as api from 'api/tmdb';
import { convertResponseToMovieResults } from 'api/tmdb/utils';

import FavoritesActionTypes from './favorites.types';
import favoritesActions from './favorites.actions';
import favoritesSelectors from './favorites.selectors';

export function* fetchMovies() {
  yield put(favoritesActions.fetchMoviesStart());
  const sessionId = yield select(authSelectors.selectSessionId);
  const accountId = yield select(authSelectors.selectAccountId);
  try {
    const { data } = yield call(api.getFavoriteMovies, sessionId, accountId, {
      sort_by: 'created_at.desc',
    });
    const results = yield call(convertResponseToMovieResults, data);
    yield put(favoritesActions.fetchMoviesSuccess(results));
  } catch (error) {
    yield put(favoritesActions.fetchMoviesFailure(error.status_message));
  }
}

export function* fetchMoreMovies() {
  const selectIsLoading = yield call(loadingSelectors.createIsLoadingSelector, [
    FavoritesActionTypes.FETCH_MOVIES,
    FavoritesActionTypes.FETCH_MORE_MOVIES,
  ]);
  const isLoading = yield select(selectIsLoading);
  const sessionId = yield select(authSelectors.selectSessionId);
  const accountId = yield select(authSelectors.selectAccountId);
  const currentPage = yield select(favoritesSelectors.selectCurrentPage);
  const totalPages = yield select(favoritesSelectors.selectTotalPages);

  if (!isLoading && currentPage < totalPages) {
    yield put(favoritesActions.fetchMoreMoviesStart());
    try {
      const { data } = yield call(api.getFavoriteMovies, sessionId, accountId, {
        sort_by: 'created_at.desc',
        page: currentPage + 1,
      });
      const results = yield call(convertResponseToMovieResults, data);
      yield put(favoritesActions.fetchMoreMoviesSuccess(results));
    } catch (error) {
      yield put(favoritesActions.fetchMoreMoviesFailure(error.status_message));
    }
  }
}

export function* onFetchMovies() {
  yield takeLatest(FavoritesActionTypes.FETCH_MOVIES, fetchMovies);
}

export function* onFetchMoreMovies() {
  yield takeEvery(FavoritesActionTypes.FETCH_MORE_MOVIES, fetchMoreMovies);
}

export default function* favoritesSagas() {
  yield all([call(onFetchMovies), call(onFetchMoreMovies)]);
}
