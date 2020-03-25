import { createSelector } from 'reselect';

const selectAuth = (state) => state.auth;

export const selectSessionId = createSelector([selectAuth], (auth) => auth.sessionId);

export const selectIsAuth = createSelector([selectSessionId], (sessionId) => !!sessionId);

export const selectIsAuthLoading = createSelector([selectAuth], (auth) => auth.isLoading);

export const selectAuthError = createSelector([selectAuth], (auth) => auth.error);
