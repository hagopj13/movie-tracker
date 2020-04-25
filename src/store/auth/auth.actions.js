// @flow
import AuthActionTypes from './auth.types';

const login = (loginData: { username: string, password: string }) => ({
  type: AuthActionTypes.LOGIN,
  payload: { ...loginData },
});

const loginStart = () => ({
  type: AuthActionTypes.LOGIN_START,
});

const loginSuccess = (sessionId: string, accountId: string) => ({
  type: AuthActionTypes.LOGIN_SUCCESS,
  payload: { sessionId, accountId },
});

const loginFailure = (error: string) => ({
  type: AuthActionTypes.LOGIN_FAILURE,
  payload: { error },
});

const loginClear = () => ({
  type: AuthActionTypes.LOGIN_CLEAR,
});

const logout = () => ({
  type: AuthActionTypes.LOGOUT,
});

const logoutStart = () => ({
  type: AuthActionTypes.LOGOUT_START,
});

const logoutSuccess = () => ({
  type: AuthActionTypes.LOGOUT_SUCCESS,
});

const logoutFailure = (error: string) => ({
  type: AuthActionTypes.LOGOUT_FAILURE,
  payload: { error },
});

const checkAuthState = () => ({
  type: AuthActionTypes.CHECK_AUTH_STATE,
});

export default {
  login,
  loginStart,
  loginSuccess,
  loginFailure,
  loginClear,
  logout,
  logoutStart,
  logoutSuccess,
  logoutFailure,
  checkAuthState,
};
