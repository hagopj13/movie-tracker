import { createSelector } from 'reselect';

const selectAuth = (state) => state.auth;

export const selectSessionId = createSelector([selectAuth], (auth) => auth.sessionId);

export const selectIsAuth = createSelector([selectSessionId], (sessionId) => !!sessionId);
