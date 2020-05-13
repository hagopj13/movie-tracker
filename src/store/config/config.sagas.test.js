import { testSaga, expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import * as api from 'api/tmdb';
import getConfigResponse from 'api/tmdb/fixtures/getConfigResponse';
import getAllGenresResponse from 'api/tmdb/fixtures/getAllGenresResponse';
import { convertResponseToImagesConfig } from 'api/tmdb/utils';

import * as configSagas from './config.sagas';
import configActions from './config.actions';
import ConfigActionTypes from './config.types';

describe('Config sagas', () => {
  describe('onFetchImagesConfig saga', () => {
    it('should trigger on FETCH_IMAGES_CONFIG', () => {
      testSaga(configSagas.onFetchImagesConfig)
        .next()
        .takeLatest(ConfigActionTypes.FETCH_IMAGES_CONFIG, configSagas.fetchImagesConfig);
    });
  });

  describe('onFetchAllGenres saga', () => {
    it('should trigger on FETCH_ALL_GENRES', () => {
      testSaga(configSagas.onFetchAllGenres)
        .next()
        .takeLatest(ConfigActionTypes.FETCH_ALL_GENRES, configSagas.fetchAllGenres);
    });
  });

  describe('fetchImagesConfig saga', () => {
    it('should fire fetchImagesConfigStart and then fetchImagesConfigSuccess if config is fetched', () => {
      expectSaga(configSagas.fetchImagesConfig)
        .provide([[matchers.call.fn(api.getConfig), { data: getConfigResponse }]])
        .put(configActions.fetchImagesConfigStart())
        .put(
          configActions.fetchImagesConfigSuccess(convertResponseToImagesConfig(getConfigResponse)),
        )
        .run();
    });

    it('should fire fetchImagesConfigStart and then fetchImagesConfigFailure if error is thrown', () => {
      const errorMessage = 'some error message';
      expectSaga(configSagas.fetchImagesConfig)
        .provide([[matchers.call.fn(api.getConfig), throwError({ status_message: errorMessage })]])
        .put(configActions.fetchImagesConfigStart())
        .put(configActions.fetchImagesConfigFailure(errorMessage))
        .run();
    });
  });

  describe('fetchAllGenres saga', () => {
    it('should fire fetchAllGenresStart and then fetchAllGenresSuccess if all genres are fetched', () => {
      expectSaga(configSagas.fetchAllGenres)
        .provide([[matchers.call.fn(api.getAllGenres), { data: getAllGenresResponse }]])
        .put(configActions.fetchAllGenresStart())
        .put(configActions.fetchAllGenresSuccess(getAllGenresResponse.genres))
        .run();
    });

    it('should fire fetchAllGenresStart and then fetchAllGenresFailure if error is thrown', () => {
      const errorMessage = 'some error message';
      expectSaga(configSagas.fetchAllGenres)
        .provide([
          [matchers.call.fn(api.getAllGenres), throwError({ status_message: errorMessage })],
        ])
        .put(configActions.fetchAllGenresStart())
        .put(configActions.fetchAllGenresFailure(errorMessage))
        .run();
    });
  });
});
