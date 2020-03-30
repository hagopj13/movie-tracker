import { combineReducers } from 'redux';

import dialogReducer from './dialog/dialog.reducer';

export default combineReducers({
  dialog: dialogReducer,
});
