// @flow
import { combineReducers } from 'redux';

import moviesReducerGenerator from 'store/common/movies/movies.reducer';

import { namespace } from './upcoming.types';

export default combineReducers({
  movies: moviesReducerGenerator(namespace),
});
