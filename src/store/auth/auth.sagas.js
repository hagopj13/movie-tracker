import { takeLatest, all, call, put, select } from 'redux-saga/effects';

import * as api from 'api/tmdb';
import DialogTypes from 'components/UI/Dialog/types';
import { hideDialog } from 'store/ui/dialog/dialog.actions';

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
    const { data: getRequestTokenData } = yield call(api.getRequestToken);

    yield call(api.login, { username, password, requestToken: getRequestTokenData.request_token });

    const { data: createSessionData } = yield call(api.createSession, {
      requestToken: getRequestTokenData.request_token,
    });

    yield put(loginSuccess(createSessionData.session_id));
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
    yield put(logoutSuccess());
  } catch (error) {
    yield put(logoutFailure(error.status_message));
  }
}

export function* onLogin() {
  yield takeLatest(AuthActionTypes.LOGIN, login);
}

export function* onLogout() {
  yield takeLatest(AuthActionTypes.LOGOUT, logout);
}

export default function* authSagas() {
  yield all([call(onLogin), call(onLogout)]);
}
