import { takeLatest, all, call, put } from 'redux-saga/effects';

import * as api from 'api/tmdb';

import ConfigActionTypes from './config.types';
import configActions from './config.actions';

function* getImagesConfig() {
  yield put(configActions.getImagesConfigStart());
  try {
    const { data } = yield call(api.getConfig);
    yield put(configActions.getImagesConfigSuccess(data.images));
  } catch (error) {
    yield put(configActions.getImagesConfigFailure(error.status_message));
  }
}

function* getAllGenres() {
  yield put(configActions.getAllGenresStart());
  try {
    const { data } = yield call(api.getAllGenres);
    yield put(configActions.getAllGenresSuccess(data.genres));
  } catch (error) {
    yield put(configActions.getAllGenresFailure(error.status_message));
  }
}

function* onGetImagesConfig() {
  yield takeLatest(ConfigActionTypes.GET_IMAGES_CONFIG, getImagesConfig);
}

function* onGetAllGenres() {
  yield takeLatest(ConfigActionTypes.GET_ALL_GENRES, getAllGenres);
}

export default function* configSagas() {
  yield all([call(onGetImagesConfig), call(onGetAllGenres)]);
}
