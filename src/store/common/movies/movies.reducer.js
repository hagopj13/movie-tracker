// @flow
import reducerGenerator from 'store/common/utils/reducerGenerator';
import type { Movie } from 'types';

import MoviesActionTypes from './movies.types';

type State = {
  list: Movie[],
  pagination: {
    page: number,
    totalPages: number,
    totalResults: number,
  } | null,
};

export const defaultInitialState: State = {
  list: [],
  pagination: null,
};

const fetchMoviesStart = () => defaultInitialState;

const fetchMoviesSuccess = (state: State, action) => ({
  ...state,
  list: action.payload.results.list,
  pagination: action.payload.results.pagination,
});

const fetchMoreMoviesSuccess = (state: State, action) => ({
  ...state,
  list: state.list.concat(action.payload.results.list),
  pagination: {
    ...state.pagination,
    page: action.payload.results.pagination.page,
  },
});

const moviesActionHandler = {
  [MoviesActionTypes.FETCH_MOVIES_START]: fetchMoviesStart,
  [MoviesActionTypes.FETCH_MOVIES_SUCCESS]: fetchMoviesSuccess,
  [MoviesActionTypes.FETCH_MORE_MOVIES_SUCCESS]: fetchMoreMoviesSuccess,
};

export default (namespace: string, initialState?: State) =>
  reducerGenerator(namespace, moviesActionHandler, initialState ?? defaultInitialState);
