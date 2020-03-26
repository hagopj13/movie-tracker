import { combineReducers } from 'redux';

import authReducer from './auth/auth.reducer';
import apiReducer from './api/api.reducer';

export default combineReducers({
  auth: authReducer,
  api: apiReducer,
});
