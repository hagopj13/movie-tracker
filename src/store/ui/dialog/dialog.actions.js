// @flow
import DialogActionTypes from './dialog.types';

const showDialog = (dialogType: string, dialogProps: any) => ({
  type: DialogActionTypes.SHOW_DIALOG,
  payload: { dialogType, dialogProps },
});

const hideDialog = (dialogType: string) => ({
  type: DialogActionTypes.HIDE_DIALOG,
  payload: { dialogType },
});

export default {
  showDialog,
  hideDialog,
};
