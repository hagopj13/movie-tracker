import { takeLatest, all, call, put, select } from 'redux-saga/effects';

import * as api from 'api/tmdb';
import DialogTypes from 'components/UI/Dialog/types';
import { hideDialog } from 'store/ui/dialog/dialog.actions';
import LocalStorageService from 'services/LocalStorageService';

import AuthActionTypes from './auth.types';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
} from './auth.actions';
import { selectSessionId } from './auth.selectors';

export function* login({ payload: { username, password } }) {
  yield put(loginStart());
  try {
    const {
      data: { request_token: requestToken },
    } = yield call(api.getRequestToken);

    yield call(api.login, { username, password, requestToken });

    const {
      data: { session_id: sessionId },
    } = yield call(api.createSession, { requestToken });

    yield call(LocalStorageService.setItem, 'sessionId', sessionId);
    yield put(loginSuccess(sessionId));
    yield put(hideDialog(DialogTypes.LOGIN));
  } catch (error) {
    yield put(loginFailure('Incorrect username or password'));
  }
}

export function* logout() {
  yield put(logoutStart());
  try {
    const sessionId = yield select(selectSessionId);
    yield call(api.deleteSession, { sessionId });
    yield call(LocalStorageService.removeItem, 'sessionId');
    yield put(logoutSuccess());
  } catch (error) {
    yield put(logoutFailure(error.status_message));
  }
}

export function* checkAuthState() {
  const sessionId = yield call(LocalStorageService.getItem, 'sessionId');
  if (sessionId) {
    yield put(loginSuccess(sessionId));
  } else {
    yield put(logoutSuccess());
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
