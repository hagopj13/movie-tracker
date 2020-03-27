import AuthActionTypes from './auth.types';

export const login = ({ username, password }) => ({
  type: AuthActionTypes.LOGIN,
  payload: { username, password },
});

export const loginStart = () => ({
  type: AuthActionTypes.LOGIN_START,
});

export const loginSuccess = (sessionId) => ({
  type: AuthActionTypes.LOGIN_SUCCESS,
  payload: { sessionId },
});

export const loginFailure = (error) => ({
  type: AuthActionTypes.LOGIN_FAILURE,
  payload: { error },
});

export const loginClear = () => ({
  type: AuthActionTypes.LOGIN_CLEAR,
});
