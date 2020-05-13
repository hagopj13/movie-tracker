import { images as imagesConfig, genres } from 'store/fixtures/config';

import configActions from './config.actions';
import ConfigActionTypes from './config.types';

describe('Config action creators', () => {
  describe('fetchImagesConfig action creator', () => {
    it('should create the fetchImagesConfig action', () => {
      const action = configActions.fetchImagesConfig();
      expect(action.type).toBe(ConfigActionTypes.FETCH_IMAGES_CONFIG);
    });
  });

  describe('fetchImagesConfigStart action creator', () => {
    it('should create the fetchImagesConfigStart action', () => {
      const action = configActions.fetchImagesConfigStart();
      expect(action.type).toBe(ConfigActionTypes.FETCH_IMAGES_CONFIG_START);
    });
  });

  describe('fetchImagesConfigSuccess action creator', () => {
    it('should create the fetchImagesConfigSuccess action', () => {
      const action = configActions.fetchImagesConfigSuccess(imagesConfig);
      expect(action.type).toBe(ConfigActionTypes.FETCH_IMAGES_CONFIG_SUCCESS);
      expect(action.payload).toEqual({ imagesConfig });
    });
  });

  describe('fetchImagesConfigFailure action creator', () => {
    it('should create the fetchImagesConfigFailure action', () => {
      const error = 'some error message';
      const action = configActions.fetchImagesConfigFailure(error);
      expect(action.type).toBe(ConfigActionTypes.FETCH_IMAGES_CONFIG_FAILURE);
      expect(action.payload).toEqual({ error });
    });
  });

  describe('fetchAllGenres action creator', () => {
    it('should create the fetchAllGenres action', () => {
      const action = configActions.fetchAllGenres();
      expect(action.type).toBe(ConfigActionTypes.FETCH_ALL_GENRES);
    });
  });

  describe('fetchAllGenresStart action creator', () => {
    it('should create the fetchAllGenresStart action', () => {
      const action = configActions.fetchAllGenresStart();
      expect(action.type).toBe(ConfigActionTypes.FETCH_ALL_GENRES_START);
    });
  });

  describe('fetchAllGenresSuccess action creator', () => {
    it('should create the fetchAllGenresSuccess action', () => {
      const action = configActions.fetchAllGenresSuccess(genres);
      expect(action.type).toBe(ConfigActionTypes.FETCH_ALL_GENRES_SUCCESS);
      expect(action.payload).toEqual({ genres });
    });
  });

  describe('fetchAllGenresFailure action creator', () => {
    it('should create the fetchAllGenresFailure action', () => {
      const error = 'some error message';
      const action = configActions.fetchAllGenresFailure(error);
      expect(action.type).toBe(ConfigActionTypes.FETCH_ALL_GENRES_FAILURE);
      expect(action.payload).toEqual({ error });
    });
  });
});
