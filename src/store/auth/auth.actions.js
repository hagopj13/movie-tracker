// @flow
import AuthActionTypes from './auth.types';

export const login = (loginData: { username: string, password: string }) => ({
  type: AuthActionTypes.LOGIN,
  payload: { ...loginData },
});

export const loginStart = () => ({
  type: AuthActionTypes.LOGIN_START,
});

export const loginSuccess = (sessionId: string) => ({
  type: AuthActionTypes.LOGIN_SUCCESS,
  payload: { sessionId },
});

export const loginFailure = (error: string) => ({
  type: AuthActionTypes.LOGIN_FAILURE,
  payload: { error },
});

export const loginClear = () => ({
  type: AuthActionTypes.LOGIN_CLEAR,
});

export const logout = () => ({
  type: AuthActionTypes.LOGOUT,
});

export const logoutStart = () => ({
  type: AuthActionTypes.LOGOUT_START,
});

export const logoutSuccess = () => ({
  type: AuthActionTypes.LOGOUT_SUCCESS,
});

export const logoutFailure = (error: string) => ({
  type: AuthActionTypes.LOGOUT_FAILURE,
  payload: { error },
});

export const checkAuthState = () => ({
  type: AuthActionTypes.CHECK_AUTH_STATE,
});
