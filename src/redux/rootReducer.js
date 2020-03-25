import { combineReducers } from 'redux';

import authReducer from './auth/auth.reducer';

export default combineReducers({
  auth: authReducer,
});
