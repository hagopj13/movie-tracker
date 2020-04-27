import { createSelector } from 'reselect';

import apiSelectors from '../api.selectors';

const selectLoaded = createSelector([apiSelectors.selectApi], (api) => api.loaded);

const createIsLoadedSelector = (actions) =>
  createSelector([selectLoaded], (loadedState) => actions.every((action) => loadedState[action]));

export default {
  createIsLoadedSelector,
};
