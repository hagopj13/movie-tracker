import { createSelector } from 'reselect';

import userSelectors from '../user.selectors';

const selectProfile = createSelector([userSelectors.selectUser], (user) => user.profile);

const selectUserName = createSelector([selectProfile], (profile) => profile.name);

export default {
  selectUserName,
};
