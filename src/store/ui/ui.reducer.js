import { combineReducers } from 'redux';

import dialogReducer, { initialState as dialogInitialState } from './dialog/dialog.reducer';

export const initialState = {
  dialog: dialogInitialState,
};

export default combineReducers({
  dialog: dialogReducer,
});
