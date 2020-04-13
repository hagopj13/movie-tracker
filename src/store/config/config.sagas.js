// @flow
import { takeLatest, all, call, put } from 'redux-saga/effects';

import * as api from 'api/tmdb';

import ConfigActionTypes from './config.types';
import configActions from './config.actions';

function* getConfig() {
  yield put(configActions.getConfigStart());
  try {
    const {
      data: { images: imagesConfig },
    } = yield call(api.getConfig);

    const {
      data: { genres },
    } = yield call(api.getAllGenres);

    yield put(configActions.getConfigSuccess({ imagesConfig, genres }));
  } catch (error) {
    yield put(configActions.getConfigFailure(error.status_message));
  }
}

function* onGetConfig() {
  yield takeLatest(ConfigActionTypes.GET_CONFIG, getConfig);
}

export default function* configSagas() {
  yield all([call(onGetConfig)]);
}
