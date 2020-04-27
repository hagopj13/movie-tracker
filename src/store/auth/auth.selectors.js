import { createSelector } from 'reselect';

const selectAuth = (state) => state.auth;

const selectSessionId = createSelector([selectAuth], (auth) => auth.sessionId);

const selectAccountId = createSelector([selectAuth], (auth) => auth.accountId);

const selectIsLoading = createSelector([selectAuth], (auth) => auth.isLoading);

const selectIsAuth = createSelector([selectSessionId], (sessionId) => !!sessionId);

export default {
  selectSessionId,
  selectAccountId,
  selectIsLoading,
  selectIsAuth,
};
