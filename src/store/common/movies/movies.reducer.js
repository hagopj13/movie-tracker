// @flow
import reducerGenerator from 'store/common/utils/reducerGenerator';
import { convertResponseToMovie } from 'api/tmdb/utils';
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

const defaultInitialState: State = {
  list: [],
  pagination: null,
};

const fetchMoviesStart = () => defaultInitialState;

const fetchMoviesSuccess = (state: State, action) => ({
  ...state,
  list: action.payload.data.results.map(convertResponseToMovie),
  pagination: {
    ...state.pagination,
    page: action.payload.data.page,
    totalPages: action.payload.data.total_pages,
    totalResults: action.payload.data.total_results,
  },
});

const fetchMoreMoviesSuccess = (state: State, action) => ({
  ...state,
  list: state.list.concat(action.payload.data.results.map(convertResponseToMovie)),
  pagination: {
    ...state.pagination,
    page: action.payload.data.page,
  },
});

const moviesActionHandler = {
  [MoviesActionTypes.FETCH_MOVIES_START]: fetchMoviesStart,
  [MoviesActionTypes.FETCH_MOVIES_SUCCESS]: fetchMoviesSuccess,
  [MoviesActionTypes.FETCH_MORE_MOVIES_SUCCESS]: fetchMoreMoviesSuccess,
};

export default (namespace: string, initialState?: State) =>
  reducerGenerator(namespace, moviesActionHandler, initialState ?? defaultInitialState);
