import { combineReducers } from 'redux';

import loadingReducer from './loading/loading.reducer';

export default combineReducers({
  loading: loadingReducer,
});
