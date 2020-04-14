// @flow
import { handleActions } from 'redux-actions';

import DialogActionTypes from './dialog.types';

type State = {
  dialogType: string | null,
  dialogProps: any,
};

const initialState: State = {
  dialogType: null,
  dialogProps: {},
};

const showDialog = (state: State, action: any) => ({
  ...state,
  dialogType: action.payload.dialogType,
  dialogProps: action.payload.dialogProps,
});

const hideDialog = (state: State) => ({
  ...state,
  dialogType: null,
  dialogProps: {},
});

const actionHandler = {
  [DialogActionTypes.SHOW_DIALOG]: showDialog,
  [DialogActionTypes.HIDE_DIALOG]: hideDialog,
};

export default handleActions(actionHandler, initialState);
