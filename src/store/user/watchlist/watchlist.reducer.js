// @flow
import { combineReducers } from 'redux';

import moviesReducerGenerator from 'store/common/movies/movies.reducer';

import { namespace } from './watchlist.types';

export default combineReducers({
  movies: moviesReducerGenerator(namespace),
});
