import { combineReducers } from 'redux';

import loadedReducer, { initialState as loadedInitialState } from './loaded/loaded.reducer';
import loadingReducer, { initialState as loadingInitialState } from './loading/loading.reducer';
import errorReducer, { initialState as errorInitialState } from './error/error.reducer';

export const initialState = {
  loaded: loadedInitialState,
  loading: loadingInitialState,
  error: errorInitialState,
};

export default combineReducers({
  loaded: loadedReducer,
  loading: loadingReducer,
  error: errorReducer,
});
