import { takeLatest, all } from 'redux-saga/effects';

import AuthActionTypes from './auth.types';

export function* login() {
  // do login stuff
}

export function* onLogin() {
  yield takeLatest(AuthActionTypes.LOGIN, login);
}

export default function* authSagas() {
  yield all([onLogin]);
}
