import { takeLatest, all, call, put } from 'redux-saga/effects';

import AuthActionTypes from './auth.types';
import { loginStart, loginSuccess, loginFailure } from './auth.actions';
import * as api from '../../api/tmdb';

export function* login({ payload: { username, password } }) {
  yield put(loginStart());
  try {
    const { data: getRequestTokenData } = yield api.getRequestToken();
    const { request_token: requestToken } = yield getRequestTokenData;

    yield api.login({ username, password, requestToken });

    const { data: createSessionData } = yield api.createSession({ requestToken });
    const { session_id: sessionId } = yield createSessionData;

    yield put(loginSuccess(sessionId));
  } catch (error) {
    yield put(loginFailure('Invalid credentials'));
  }
}

export function* onLogin() {
  yield takeLatest(AuthActionTypes.LOGIN, login);
}

export default function* authSagas() {
  yield all([call(onLogin)]);
}
