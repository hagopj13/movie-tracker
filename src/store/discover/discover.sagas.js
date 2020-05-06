import { all, call, takeLatest, takeEvery, put, select } from 'redux-saga/effects';

import loadingSelectors from 'store/api/loading/loading.selectors';
import * as api from 'api/tmdb';
import { convertResponseToMovieResults } from 'api/tmdb/utils';
import type { GetDiscoverMoviesParams } from 'api/tmdb/apis/movies';

import DiscoverActionTypes from './discover.types';
import discoverActions from './discover.actions';
import discoverSelectors from './discover.selectors';

export function* getFilterParams(): $Rest<GetDiscoverMoviesParams, {| page?: number |}> {
  const sortBy = yield select(discoverSelectors.selectSortBy);
  const genres = yield select(discoverSelectors.selectGenres);
  const releaseDateStart = yield select(discoverSelectors.selectReleaseDateStart);
  const releaseDateEnd = yield select(discoverSelectors.selectReleaseDateEnd);

  return {
    sort_by: sortBy,
    ...(sortBy.includes('vote_average') && { 'vote_count.gte': 100 }),
    ...(genres.length && { with_genres: genres.join(',') }),
    ...(releaseDateStart && { 'primary_release_date.gte': releaseDateStart.format('YYYY-MM-DD') }),
    ...(releaseDateEnd && { 'primary_release_date.lte': releaseDateEnd.format('YYYY-MM-DD') }),
  };
}

export function* fetchMovies() {
  yield put(discoverActions.fetchMoviesStart());
  try {
    const filterParams = yield call(getFilterParams);
    const { data } = yield call(api.getDiscoverMovies, { ...filterParams });
    const results = yield call(convertResponseToMovieResults, data);
    yield put(discoverActions.fetchMoviesSuccess(results));
  } catch (error) {
    yield put(discoverActions.fetchMoviesFailure(error.status_message));
  }
}

export function* fetchMoreMovies() {
  const selectIsLoading = yield call(loadingSelectors.createIsLoadingSelector, [
    DiscoverActionTypes.FETCH_MOVIES,
    DiscoverActionTypes.FETCH_MORE_MOVIES,
  ]);
  const isLoading = yield select(selectIsLoading);
  const currentPage = yield select(discoverSelectors.selectCurrentPage);
  const totalPages = yield select(discoverSelectors.selectTotalPages);
  const filterParams = yield call(getFilterParams);

  if (!isLoading && currentPage < totalPages) {
    yield put(discoverActions.fetchMoreMoviesStart());
    try {
      const { data } = yield call(api.getDiscoverMovies, {
        page: currentPage + 1,
        ...filterParams,
      });
      const results = yield call(convertResponseToMovieResults, data);
      yield put(discoverActions.fetchMoreMoviesSuccess(results));
    } catch (error) {
      yield put(discoverActions.fetchMoreMoviesFailure(error.status_message));
    }
  }
}

export function* onFetchMovies() {
  yield takeLatest(DiscoverActionTypes.FETCH_MOVIES, fetchMovies);
}

export function* onFetchMoreMovies() {
  yield takeEvery(DiscoverActionTypes.FETCH_MORE_MOVIES, fetchMoreMovies);
}

export default function* discoverSagas() {
  yield all([call(onFetchMovies), call(onFetchMoreMovies)]);
}
