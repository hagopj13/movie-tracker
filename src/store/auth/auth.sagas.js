import { takeLatest, all, call, put, select } from 'redux-saga/effects';

import * as api from 'api/tmdb';
import dialogActions from 'store/ui/dialog/dialog.actions';
import dialogTypes from 'config/dialogTypes';

import AuthActionTypes from './auth.types';
import authActions from './auth.actions';
import authSelectors from './auth.selectors';

export function* login({ payload: { username, password } }) {
  yield put(authActions.loginStart());
  try {
    const {
      data: { request_token: requestToken },
    } = yield call(api.getRequestToken);

    yield call(api.login, { username, password, requestToken });

    const {
      data: { session_id: sessionId },
    } = yield call(api.createSession, { requestToken });

    const {
      data: { id: accountId },
    } = yield call(api.getAccountDetails, sessionId);

    yield call([localStorage, 'setItem'], 'sessionId', sessionId);
    yield call([localStorage, 'setItem'], 'accountId', accountId);
    yield put(authActions.loginSuccess(sessionId, accountId));
    yield put(dialogActions.hideDialog(dialogTypes.LOGIN));
  } catch (error) {
    yield put(authActions.loginFailure('Incorrect username or password'));
  }
}

export function* logout() {
  yield put(authActions.logoutStart());
  try {
    const sessionId = yield select(authSelectors.selectSessionId);
    yield call(api.deleteSession, { sessionId });
    yield call([localStorage, 'removeItem'], 'sessionId');
    yield call([localStorage, 'removeItem'], 'accountId');
    yield put(authActions.logoutSuccess());
  } catch (error) {
    yield put(authActions.logoutFailure(error.status_message));
  }
}

export function* checkAuthState() {
  const sessionId = yield call([localStorage, 'getItem'], 'sessionId');
  const accountId = yield call([localStorage, 'getItem'], 'accountId');
  if (sessionId && accountId) {
    yield put(authActions.loginSuccess(sessionId, accountId));
  } else {
    yield put(authActions.logoutSuccess());
  }
}

export function* onLogin() {
  yield takeLatest(AuthActionTypes.LOGIN, login);
}

export function* onLogout() {
  yield takeLatest(AuthActionTypes.LOGOUT, logout);
}

export function* onCheckAuthState() {
  yield takeLatest(AuthActionTypes.CHECK_AUTH_STATE, checkAuthState);
}

export default function* authSagas() {
  yield all([call(onLogin), call(onLogout), call(onCheckAuthState)]);
}
