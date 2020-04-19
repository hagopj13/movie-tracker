import { takeLatest, all, call, put } from 'redux-saga/effects';

import * as api from 'api/tmdb';

import ConfigActionTypes from './config.types';
import configActions from './config.actions';

function* fetchImagesConfig() {
  yield put(configActions.fetchImagesConfigStart());
  try {
    const { data } = yield call(api.getConfig);
    yield put(configActions.fetchImagesConfigSuccess(data.images));
  } catch (error) {
    yield put(configActions.fetchImagesConfigFailure(error.status_message));
  }
}

function* fetchAllGenres() {
  yield put(configActions.fetchAllGenresStart());
  try {
    const { data } = yield call(api.getAllGenres);
    yield put(configActions.fetchAllGenresSuccess(data.genres));
  } catch (error) {
    yield put(configActions.fetchAllGenresFailure(error.status_message));
  }
}

function* onFetchImagesConfig() {
  yield takeLatest(ConfigActionTypes.FETCH_IMAGES_CONFIG, fetchImagesConfig);
}

function* onFetchAllGenres() {
  yield takeLatest(ConfigActionTypes.FETCH_ALL_GENRES, fetchAllGenres);
}

export default function* configSagas() {
  yield all([call(onFetchImagesConfig), call(onFetchAllGenres)]);
}
