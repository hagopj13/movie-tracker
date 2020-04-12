// @flow
import { takeLatest, all, call, put } from 'redux-saga/effects';

import * as api from 'api/tmdb';

import ConfigActionTypes from './config.types';
import { getConfigStart, getConfigSuccess, getConfigFailure } from './config.actions';

export function* getConfig() {
  yield put(getConfigStart());
  try {
    const {
      data: { images: imagesConfig },
    } = yield call(api.getConfig);

    const {
      data: { genres },
    } = yield call(api.getAllGenres);

    yield put(getConfigSuccess({ imagesConfig, genres }));
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
