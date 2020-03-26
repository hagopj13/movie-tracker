import { createSelector } from 'reselect';

import { createIsLoadingSelector } from '../api/loading/loading.selectors';
import AuthActionTypes from './auth.types';

const selectAuth = (state) => state.auth;

export const selectSessionId = createSelector([selectAuth], (auth) => auth.sessionId);

export const selectIsAuth = createSelector([selectSessionId], (sessionId) => !!sessionId);

export const selectIsLoginLoading = createIsLoadingSelector([AuthActionTypes.LOGIN]);
