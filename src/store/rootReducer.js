import { combineReducers } from 'redux';

import authReducer from './auth/auth.reducer';
import apiReducer from './api/api.reducer';
import configReducer from './config/config.reducer';
import discoverReducer from './discover/discover.reducer';
import uiReducer from './ui/ui.reducer';
import upcomingReducer from './upcoming/upcoming.reducer';

export default combineReducers({
  auth: authReducer,
  api: apiReducer,
  config: configReducer,
  discover: discoverReducer,
  ui: uiReducer,
  upcoming: upcomingReducer,
});
