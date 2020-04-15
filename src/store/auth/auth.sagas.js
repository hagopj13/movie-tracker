import { takeLatest, all, call, put, select } from 'redux-saga/effects';

import * as api from 'api/tmdb';
import DialogTypes from 'components/Dialog/types';
import dialogActions from 'store/ui/dialog/dialog.actions';
import LocalStorageService from 'services/LocalStorageService';

import AuthActionTypes from './auth.types';
import authActions from './auth.actions';
import authSelectors from './auth.selectors';

function* login({ payload: { username, password } }) {
  yield put(authActions.loginStart());
  try {
    const {
      data: { request_token: requestToken },
    } = yield call(api.getRequestToken);

    yield call(api.login, { username, password, requestToken });

    const {
      data: { session_id: sessionId },
    } = yield call(api.createSession, { requestToken });

    yield call(LocalStorageService.setItem, 'sessionId', sessionId);
    yield put(authActions.loginSuccess(sessionId));
    yield put(dialogActions.hideDialog(DialogTypes.LOGIN));
  } catch (error) {
    yield put(authActions.loginFailure('Incorrect username or password'));
  }
}

function* logout() {
  yield put(authActions.logoutStart());
  try {
    const sessionId = yield select(authSelectors.selectSessionId);
    yield call(api.deleteSession, { sessionId });
    yield call(LocalStorageService.removeItem, 'sessionId');
    yield put(authActions.logoutSuccess());
  } catch (error) {
    yield put(authActions.logoutFailure(error.status_message));
  }
}

function* checkAuthState() {
  const sessionId = yield call(LocalStorageService.getItem, 'sessionId');
  if (sessionId) {
    yield put(authActions.loginSuccess(sessionId));
  } else {
    yield put(authActions.logoutSuccess());
  }
}

function* onLogin() {
  yield takeLatest(AuthActionTypes.LOGIN, login);
}

function* onLogout() {
  yield takeLatest(AuthActionTypes.LOGOUT, logout);
}

function* onCheckAuthState() {
  yield takeLatest(AuthActionTypes.CHECK_AUTH_STATE, checkAuthState);
}

export default function* authSagas() {
  yield all([call(onLogin), call(onLogout), call(onCheckAuthState)]);
}
