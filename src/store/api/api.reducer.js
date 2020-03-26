import { combineReducers } from 'redux';

import loadingReducer from './loading/loading.reducer';
import errorReducer from './error/error.reducer';

export default combineReducers({
  loading: loadingReducer,
  error: errorReducer,
});
