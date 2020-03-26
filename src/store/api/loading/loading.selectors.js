import { createSelector } from 'reselect';

import { selectApi } from '../api.selectors';

const selectLoading = createSelector([selectApi], (api) => api.loading);

export const createIsLoadingSelector = (actions) =>
  createSelector([selectLoading], (loadingState) => actions.some((action) => loadingState[action]));
