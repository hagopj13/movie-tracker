import { createSelector } from 'reselect';

import { selectUi } from '../ui.selectors';

export const selectDialog = createSelector([selectUi], (ui) => ui.dialog);

export const selectDialogType = createSelector([selectDialog], (dialog) => dialog.dialogType);
export const selectDialogProps = createSelector([selectDialog], (dialog) => dialog.dialogProps);
