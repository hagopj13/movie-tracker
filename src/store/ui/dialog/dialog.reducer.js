import DialogActionTypes from './dialog.types';

const initialState = {
  dialogType: null,
  dialogProps: {},
};

export default (state = initialState, action) => {
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
