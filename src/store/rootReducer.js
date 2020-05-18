import { combineReducers } from 'redux';

import authReducer, { initialState as authInitialState } from './auth/auth.reducer';
import apiReducer, { initialState as apiInitialState } from './api/api.reducer';
import configReducer, { initialState as configInitialState } from './config/config.reducer';
import discoverReducer, { initialState as discoverInitialState } from './discover/discover.reducer';
import movieReducer, { initialState as movieInitialState } from './movie/movie.reducer';
import searchReducer, { initialState as searchInitialState } from './search/search.reducer';
import uiReducer, { initialState as uiInitialState } from './ui/ui.reducer';
import upcomingReducer, { initialState as upcomingInitialState } from './upcoming/upcoming.reducer';
import userReducer, { initialState as userInitialState } from './user/user.reducer';

export const initialState = {
  auth: authInitialState,
  api: apiInitialState,
  config: configInitialState,
  discover: discoverInitialState,
  movie: movieInitialState,
  search: searchInitialState,
  ui: uiInitialState,
  upcoming: upcomingInitialState,
  user: userInitialState,
};

export default combineReducers({
  auth: authReducer,
  api: apiReducer,
  config: configReducer,
  discover: discoverReducer,
  movie: movieReducer,
  search: searchReducer,
  ui: uiReducer,
  upcoming: upcomingReducer,
  user: userReducer,
});
