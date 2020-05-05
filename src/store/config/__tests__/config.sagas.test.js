import { testSaga, expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import * as configSagas from 'store/config/config.sagas';
import ConfigActionTypes from 'store/config/config.types';
import configActions from 'store/config/config.actions';
import * as api from 'api/tmdb';
import getConfigResponse from 'api/tmdb/fixtures/getConfigResponse';
import getAllGenresResponse from 'api/tmdb/fixtures/getAllGenresResponse';
import { convertResponseToImagesConfig } from 'api/tmdb/utils';

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
    it('should fire fetchImagesConfigStart action', () => {
      testSaga(configSagas.fetchImagesConfig).next().put(configActions.fetchImagesConfigStart());
    });

    it('should fire fetchImagesConfigSuccess if config is fetched', () => {
      expectSaga(configSagas.fetchImagesConfig)
        .provide([[matchers.call.fn(api.getConfig), { data: getConfigResponse }]])
        .put(
          configActions.fetchImagesConfigSuccess(convertResponseToImagesConfig(getConfigResponse)),
        )
        .run();
    });

    it('should fire fetchImagesConfigFailure if error occures', () => {
      const errorMessage = 'some error message';
      expectSaga(configSagas.fetchImagesConfig)
        .provide([[matchers.call.fn(api.getConfig), throwError({ status_message: errorMessage })]])
        .put(configActions.fetchImagesConfigFailure(errorMessage))
        .run();
    });
  });

  describe('fetchAllGenres saga', () => {
    it('should first fire fetchAllGenresStart action', () => {
      testSaga(configSagas.fetchAllGenres).next().put(configActions.fetchAllGenresStart());
    });

    it('should fire fetchAllGenresSuccess if all genres are fetched', () => {
      expectSaga(configSagas.fetchAllGenres)
        .provide([[matchers.call.fn(api.getAllGenres), { data: getAllGenresResponse }]])
        .put(configActions.fetchAllGenresStart())
        .put(configActions.fetchAllGenresSuccess(getAllGenresResponse.genres))
        .run();
    });

    it('should fire fetchAllGenresFailure if error occures', () => {
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
