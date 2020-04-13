// @flow
import { combineReducers } from 'redux';

import moviesReducerGenerator from 'store/common/movies/movies.reducer';
import filtersReducerGenerator from 'store/common/filters/filters.reducer';

import { namespace } from './discover.types';

export default combineReducers({
  movies: moviesReducerGenerator(namespace),
  filters: filtersReducerGenerator(namespace),
});
