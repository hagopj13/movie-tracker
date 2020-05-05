import { takeLatest, all, call, put } from 'redux-saga/effects';

import * as api from 'api/tmdb';
import { convertResponseToImagesConfig } from 'api/tmdb/utils';

import ConfigActionTypes from './config.types';
import configActions from './config.actions';

export function* fetchImagesConfig() {
  yield put(configActions.fetchImagesConfigStart());
  try {
    const { data } = yield call(api.getConfig);
    const imagesConfig = yield call(convertResponseToImagesConfig, data);
    yield put(configActions.fetchImagesConfigSuccess(imagesConfig));
  } catch (error) {
    yield put(configActions.fetchImagesConfigFailure(error.status_message));
  }
}

export function* fetchAllGenres() {
  yield put(configActions.fetchAllGenresStart());
  try {
    const { data } = yield call(api.getAllGenres);
    yield put(configActions.fetchAllGenresSuccess(data.genres));
  } catch (error) {
    yield put(configActions.fetchAllGenresFailure(error.status_message));
  }
}

export function* onFetchImagesConfig() {
  yield takeLatest(ConfigActionTypes.FETCH_IMAGES_CONFIG, fetchImagesConfig);
}

export function* onFetchAllGenres() {
  yield takeLatest(ConfigActionTypes.FETCH_ALL_GENRES, fetchAllGenres);
}

export default function* configSagas() {
  yield all([call(onFetchImagesConfig), call(onFetchAllGenres)]);
}
