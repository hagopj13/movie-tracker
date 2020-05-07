// @flow
import { combineReducers } from 'redux';

import moviesReducerGenerator, {
  defaultInitialState as moviesInitialState,
} from 'store/common/movies/movies.reducer';

import { namespace } from './watchlist.types';

export const initialState = {
  movies: moviesInitialState,
};

export default combineReducers({
  movies: moviesReducerGenerator(namespace),
});
