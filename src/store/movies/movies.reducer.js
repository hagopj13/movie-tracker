import { combineReducers } from 'redux';

import discoverReducer from './discover/discover.reducer';

export default combineReducers({
  discover: discoverReducer,
});
