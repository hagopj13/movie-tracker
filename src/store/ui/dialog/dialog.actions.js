// @flow
import DialogActionTypes from './dialog.types';

export const showDialog = (dialogType: string, dialogProps: any) => ({
  type: DialogActionTypes.SHOW_DIALOG,
  payload: { dialogType, dialogProps },
});

export const hideDialog = (dialogType: string) => ({
  type: DialogActionTypes.HIDE_DIALOG,
  payload: { dialogType },
});
