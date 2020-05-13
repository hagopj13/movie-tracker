import moment from 'moment';

import typeGenerator from 'store/common/utils/typeGenerator';

import filtersReducerGenerator, { defaultInitialState } from './filters.reducer';
import FiltersActionTypes from './filters.types';

const namespace = 'someNamespace';
const filtersReducer = filtersReducerGenerator(namespace);

describe('Filters reducer', () => {
  it('should return the default initial state if no initial state is specified', () => {
    const state = filtersReducerGenerator(namespace)(undefined, { type: '@@INIT' });
    expect(state).toEqual(defaultInitialState);
  });

  it('should return the specified initial state if an initial state is specified', () => {
    const specifiedInitialState = {
      sortBy: 'someSortBy',
      genres: [1, 2, 3],
      releaseDateStart: moment(),
      releaseDateEnd: moment(),
    };
    const state = filtersReducerGenerator(namespace, specifiedInitialState)(undefined, {
      type: '@@INIT',
    });
    expect(state).toEqual(specifiedInitialState);
  });

  it('should set the sortBy filter on setSortBy action', () => {
    const sortBy = 'someSortBy';
    const action = {
      type: typeGenerator(namespace, FiltersActionTypes.SET_SORT_BY),
      payload: { sortBy },
    };
    const state = filtersReducer(defaultInitialState, action);
    expect(state.sortBy).toBe(sortBy);
  });

  it('should add genreId to genres filter on toggleGenre action, if genreId is not already there', () => {
    const genreId = 1;
    const action = {
      type: typeGenerator(namespace, FiltersActionTypes.TOGGLE_GENRE),
      payload: { genreId },
    };
    const state = filtersReducer(defaultInitialState, action);
    expect(state.genres).toEqual([1]);
  });

  it('should remove genreId from genres filter on toggleGenre action, if genreId is already there', () => {
    const genreId = 2;
    const currentState = {
      ...defaultInitialState,
      genres: [1, 2, 3],
    };
    const action = {
      type: typeGenerator(namespace, FiltersActionTypes.TOGGLE_GENRE),
      payload: { genreId },
    };
    const state = filtersReducer(currentState, action);
    expect(state.genres).toEqual([1, 3]);
  });

  it('should set the releaseDateStart filter on setReleaseDateStart action', () => {
    const releaseDateStart = moment;
    const action = {
      type: typeGenerator(namespace, FiltersActionTypes.SET_RELEASE_DATE_START),
      payload: { releaseDateStart },
    };
    const state = filtersReducer(defaultInitialState, action);
    expect(state.releaseDateStart).toEqual(releaseDateStart);
  });

  it('should set the releaseDateEnd filter on setReleaseDateEnd action', () => {
    const releaseDateEnd = moment;
    const action = {
      type: typeGenerator(namespace, FiltersActionTypes.SET_RELEASE_DATE_END),
      payload: { releaseDateEnd },
    };
    const state = filtersReducer(defaultInitialState, action);
    expect(state.releaseDateEnd).toEqual(releaseDateEnd);
  });
});
