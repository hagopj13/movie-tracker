import { combineReducers } from 'redux';

import authReducer from './auth/auth.reducer';
import apiReducer from './api/api.reducer';
import configReducer from './config/config.reducer';
import discoverReducer from './discover/discover.reducer';
import movieReducer from './movie/movie.reducer';
import searchReducer from './search/search.reducer';
import uiReducer from './ui/ui.reducer';
import upcomingReducer from './upcoming/upcoming.reducer';
import userReducer from './user/user.reducer';

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
