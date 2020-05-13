import typeGenerator from 'store/common/utils/typeGenerator';
import moviesState from 'store/fixtures/movies';

import moviesReducerGenerator, { defaultInitialState } from './movies.reducer';
import MoviesActionTypes from './movies.types';

const namespace = 'someNamespace';
const moviesReducer = moviesReducerGenerator(namespace);

describe('Movies reducer', () => {
  it('should return the default initial state if no initial state is specified', () => {
    const state = moviesReducerGenerator(namespace)(undefined, { type: '@@INIT' });
    expect(state).toEqual(defaultInitialState);
  });

  it('should return the specified initial state if an initial state is specified', () => {
    const state = moviesReducerGenerator(namespace, moviesState)(undefined, {
      type: '@@INIT',
    });
    expect(state).toEqual(moviesState);
  });

  it('should reset the state on fetchMoviesStart action', () => {
    const action = {
      type: typeGenerator(namespace, MoviesActionTypes.FETCH_MOVIES_START),
    };
    const state = moviesReducer(moviesState, action);
    expect(state).toEqual(defaultInitialState);
  });

  it('should set the state on fetchMoviesSuccess action', () => {
    const results = {
      list: [moviesState.list[0]],
      pagination: {
        page: 1,
        totalPages: 3,
        totalResults: 3,
      },
    };
    const action = {
      type: typeGenerator(namespace, MoviesActionTypes.FETCH_MOVIES_SUCCESS),
      payload: { results },
    };
    const state = moviesReducer(defaultInitialState, action);
    expect(state).toEqual(results);
  });

  it('should append the new results to the current list and update the current page of pagination on fetchMoreMoviesSuccess action', () => {
    const currentState = {
      list: [moviesState.list[0]],
      pagination: {
        page: 1,
        totalPages: 3,
        totalResults: 3,
      },
    };
    const newResults = {
      list: [moviesState.list[1]],
      pagination: {
        page: 2,
        totalPages: 3,
        totalResults: 3,
      },
    };
    const action = {
      type: typeGenerator(namespace, MoviesActionTypes.FETCH_MORE_MOVIES_SUCCESS),
      payload: { results: newResults },
    };
    const state = moviesReducer(currentState, action);
    expect(state.list).toEqual([...currentState.list, ...newResults.list]);
    expect(state.pagination).toEqual({
      ...currentState.pagination,
      page: newResults.pagination.page,
    });
  });
});
