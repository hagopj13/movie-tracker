// @flow
import { handleActions } from 'redux-actions';

import DialogActionTypes from './dialog.types';

type State = {
  dialogType: string | null,
  dialogProps: any,
};

export const initialState: State = {
  dialogType: null,
  dialogProps: {},
};

const showDialog = (state: State, action: any) => ({
  ...state,
  dialogType: action.payload.dialogType,
  dialogProps: action.payload.dialogProps,
});

const hideDialog = (state: State, action: any) => {
  if (action.payload.dialogType === state.dialogType) {
    return {
      ...state,
      dialogType: null,
      dialogProps: {},
    };
  }
  return state;
};

const actionHandler = {
  [DialogActionTypes.SHOW_DIALOG]: showDialog,
  [DialogActionTypes.HIDE_DIALOG]: hideDialog,
};

export default handleActions(actionHandler, initialState);
