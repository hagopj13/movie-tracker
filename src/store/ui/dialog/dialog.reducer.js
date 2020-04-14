// @flow
import DialogActionTypes from './dialog.types';

type State = {
  dialogType: string | null,
  dialogProps: any,
};

const initialState: State = {
  dialogType: null,
  dialogProps: {},
};

export default (state: State = initialState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case DialogActionTypes.SHOW_DIALOG:
      return {
        ...state,
        dialogType: payload.dialogType,
        dialogProps: payload.dialogProps,
      };
    case DialogActionTypes.HIDE_DIALOG:
      if (state.dialogType === payload.dialogType) {
        return {
          ...state,
          dialogType: null,
          dialogProps: {},
        };
      }
      return state;
    default:
      return state;
  }
};
