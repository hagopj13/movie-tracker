import { takeLatest, all, call, put } from 'redux-saga/effects';

import AuthActionTypes from './auth.types';
import { loginStart, loginSuccess, loginFailure } from './auth.actions';
import * as api from '../../api/tmdb';

export function* login({ payload: { username, password } }) {
  yield put(loginStart());
  try {
    const { data: getRequestTokenData } = yield api.getRequestToken();

    yield api.login({ username, password, requestToken: getRequestTokenData.request_token });

    const { data: createSessionData } = yield api.createSession({
      requestToken: getRequestTokenData.request_token,
    });

    yield put(loginSuccess(createSessionData.session_id));
  } catch (error) {
    yield put(loginFailure('Incorrect username or password'));
  }
}

export function* onLogin() {
  yield takeLatest(AuthActionTypes.LOGIN, login);
}

export default function* authSagas() {
  yield all([call(onLogin)]);
}
