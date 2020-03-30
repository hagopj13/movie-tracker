import DialogActionTypes from './dialog.types';

export const showDialog = (dialogType, dialogProps) => ({
  type: DialogActionTypes.SHOW_DIALOG,
  payload: { dialogType, dialogProps },
});

export const hideDialog = (dialogType) => ({
  type: DialogActionTypes.HIDE_DIALOG,
  payload: { dialogType },
});
