import { combineReducers } from 'redux';

import authReducer from './auth/auth.reducer';
import apiReducer from './api/api.reducer';
import configReducer from './config/config.reducer';
import moviesReducer from './movies/movies.reducer';
import uiReducer from './ui/ui.reducer';

export default combineReducers({
  auth: authReducer,
  api: apiReducer,
  config: configReducer,
  movies: moviesReducer,
  ui: uiReducer,
});
