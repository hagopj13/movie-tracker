import { combineReducers } from 'redux';

import authReducer from './auth/auth.reducer';
import moviesReducer from './movies/movies.reducer';
import apiReducer from './api/api.reducer';
import uiReducer from './ui/ui.reducer';

export default combineReducers({
  auth: authReducer,
  movies: moviesReducer,
  api: apiReducer,
  ui: uiReducer,
});
