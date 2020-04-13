import { createSelector } from 'reselect';

import uiSelectors from '../ui.selectors';

const selectDialog = createSelector([uiSelectors.selectUi], (ui) => ui.dialog);

const selectDialogType = createSelector([selectDialog], (dialog) => dialog.dialogType);
const selectDialogProps = createSelector([selectDialog], (dialog) => dialog.dialogProps);

export default {
  selectDialogType,
  selectDialogProps,
};
