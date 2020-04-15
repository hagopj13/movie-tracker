// @flow
import typeGenerator from 'store/common/utils/typeGenerator';
import actionCreatorGenerator from 'store/common/utils/actionCreatorGenerator';

import MoviesActionTypes from './movies.types';

const fetchMovies = (namespace) => () => ({
  type: typeGenerator(namespace, MoviesActionTypes.FETCH_MOVIES),
});

const fetchMoviesStart = (namespace) => () => ({
  type: typeGenerator(namespace, MoviesActionTypes.FETCH_MOVIES_START),
});

const fetchMoviesSuccess = (namespace) => (data: any) => ({
  type: typeGenerator(namespace, MoviesActionTypes.FETCH_MOVIES_SUCCESS),
  payload: { data },
});

const fetchMoviesFailure = (namespace) => (error: string) => ({
  type: typeGenerator(namespace, MoviesActionTypes.FETCH_MOVIES_FAILURE),
  payload: { error },
});

const fetchMoreMovies = (namespace) => () => ({
  type: typeGenerator(namespace, MoviesActionTypes.FETCH_MORE_MOVIES),
});

const fetchMoreMoviesStart = (namespace) => () => ({
  type: typeGenerator(namespace, MoviesActionTypes.FETCH_MORE_MOVIES_START),
});

const fetchMoreMoviesSuccess = (namespace) => (data: any) => ({
  type: typeGenerator(namespace, MoviesActionTypes.FETCH_MORE_MOVIES_SUCCESS),
  payload: { data },
});

const fetchMoreMoviesFailure = (namespace) => (error: string) => ({
  type: typeGenerator(namespace, MoviesActionTypes.FETCH_MORE_MOVIES_FAILURE),
  payload: { error },
});

type Action = {
  type: string,
  payload?: any,
};

type MoviesActionCreators = {
  fetchMovies: () => Action,
  fetchMoviesStart: () => Action,
  fetchMoviesSuccess: (data: any) => Action,
  fetchMoviesFailure: (error: string) => Action,
  fetchMoreMovies: () => Action,
  fetchMoreMoviesStart: () => Action,
  fetchMoreMoviesSuccess: (data: any) => Action,
  fetchMoreMoviesFailure: (error: string) => Action,
};

export default (namespace: string): MoviesActionCreators =>
  actionCreatorGenerator<MoviesActionCreators>(namespace, {
    fetchMovies,
    fetchMoviesStart,
    fetchMoviesSuccess,
    fetchMoviesFailure,
    fetchMoreMovies,
    fetchMoreMoviesStart,
    fetchMoreMoviesSuccess,
    fetchMoreMoviesFailure,
  });
