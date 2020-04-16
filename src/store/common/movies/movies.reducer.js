// @flow
import reducerGenerator from 'store/common/utils/reducerGenerator';

import MoviesActionTypes from './movies.types';

export type MoviesResultsItem = {
  id: string,
  title: string,
  releaseDate: string,
  voteAverage: number,
  voteCount: number,
  posterPath: string,
};

type State = {
  results: MoviesResultsItem[],
  pagination: {
    page: number,
    totalPages: number,
    totalResults: number,
  } | null,
};

const defaultInitialState: State = {
  results: [],
  pagination: null,
};

const convertResults = (results: any): MoviesResultsItem[] => {
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
  results: convertResults(action.payload.data.results),
  pagination: {
    ...state.pagination,
    page: action.payload.data.page,
    totalPages: action.payload.data.total_pages,
    totalResults: action.payload.data.total_results,
  },
});

const fetchMoreMoviesSuccess = (state: State, action) => ({
  ...state,
  results: state.results.concat(convertResults(action.payload.data.results)),
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
