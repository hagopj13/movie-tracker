// @flow
import { combineReducers } from 'redux';

import moviesReducerGenerator, {
  defaultInitialState as moviesInitialState,
} from 'store/common/movies/movies.reducer';
import filtersReducerGenerator, {
  defaultInitialState as filtersInitialState,
} from 'store/common/filters/filters.reducer';

import { namespace } from './discover.types';

export const initialState = {
  movies: moviesInitialState,
  filters: filtersInitialState,
};

export default combineReducers({
  movies: moviesReducerGenerator(namespace),
  filters: filtersReducerGenerator(namespace),
});
