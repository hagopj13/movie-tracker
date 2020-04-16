// @flow
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import moviesReducerGenerator from 'store/common/movies/movies.reducer';

import SearchActionTypes, { namespace } from './search.types';

type QueryState = string;

const initialState: QueryState = '';

const setSearchQuery = (state: QueryState, action: any): QueryState => action.payload.query;

const queryActionHandler = {
  [SearchActionTypes.SET_SEARCH_QUERY]: setSearchQuery,
};

const queryReducer = handleActions(queryActionHandler, initialState);

export default combineReducers({
  query: queryReducer,
  movies: moviesReducerGenerator(namespace),
});
