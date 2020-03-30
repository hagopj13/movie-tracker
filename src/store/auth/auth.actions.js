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
