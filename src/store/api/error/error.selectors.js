import { createSelector } from 'reselect';

import { selectApi } from '../api.selectors';

const selectError = createSelector([selectApi], (api) => api.error);

export const createErrorSelector = (actions) =>
  createSelector(
    [selectError],
    (errorState) =>
      actions.map((action) => errorState[action]).filter((errorMessage) => !!errorMessage)[0] ?? '',
  );
