// @flow
import reducerGenerator from 'store/common/utils/reducerGenerator';

import MoviesActionTypes from './movies.types';

export type MoviesListItem = {
  id: string,
  title: string,
  releaseDate: string,
  voteAverage: number,
  voteCount: number,
  posterPath: string,
};

type State = {
  list: MoviesListItem[],
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

const convertResultsToList = (results: any): MoviesListItem[] => {
  return results.map((result) => ({
    id: result.id,
    title: result.title,
    releaseDate: result.release_date,
    voteAverage: Math.round((result.vote_average / 2) * 10) / 10,
    voteCount: result.vote_count,
    posterPath: result.poster_path,
  }));
};

const fetchMoviesStart = () => ({
  ...defaultInitialState,
});

const fetchMoviesSuccess = (state: State, action) => ({
  ...state,
  list: convertResultsToList(action.payload.data.results),
  pagination: {
    ...state.pagination,
    page: action.payload.data.page,
    totalPages: action.payload.data.total_pages,
    totalResults: action.payload.data.total_results,
  },
});

const fetchMoreMoviesSuccess = (state: State, action) => ({
  ...state,
  list: state.list.concat(convertResultsToList(action.payload.data.results)),
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
