import { combineReducers } from 'redux';

import loadedReducer from './loaded/loaded.reducer';
import loadingReducer from './loading/loading.reducer';
import errorReducer from './error/error.reducer';

export default combineReducers({
  loaded: loadedReducer,
  loading: loadingReducer,
  error: errorReducer,
});
