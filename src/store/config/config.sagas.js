// @flow
import { takeLatest, all, call, put } from 'redux-saga/effects';

import * as api from 'api/tmdb';

import ConfigActionTypes from './config.types';
import { getConfigStart, getConfigSuccess, getConfigFailure } from './config.actions';

export function* getConfig() {
  yield put(getConfigStart());
  try {
    const { data } = yield call(api.getConfig);
    yield put(getConfigSuccess(data));
  } catch (error) {
    yield put(getConfigFailure(error.status_message));
  }
}

export function* onGetConfig() {
  yield takeLatest(ConfigActionTypes.GET_CONFIG, getConfig);
}

export default function* configSagas() {
  yield all([call(onGetConfig)]);
}
