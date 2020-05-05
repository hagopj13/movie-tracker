// @flow
import type { ImagesConfig, Genre } from 'types';

import ConfigActionTypes from './config.types';

const fetchImagesConfig = () => ({
  type: ConfigActionTypes.FETCH_IMAGES_CONFIG,
});

const fetchImagesConfigStart = () => ({
  type: ConfigActionTypes.FETCH_IMAGES_CONFIG_START,
});

const fetchImagesConfigSuccess = (imagesConfig: ImagesConfig) => ({
  type: ConfigActionTypes.FETCH_IMAGES_CONFIG_SUCCESS,
  payload: { imagesConfig },
});

const fetchImagesConfigFailure = (error: string) => ({
  type: ConfigActionTypes.FETCH_IMAGES_CONFIG_FAILURE,
  payload: { error },
});

const fetchAllGenres = () => ({
  type: ConfigActionTypes.FETCH_ALL_GENRES,
});

const fetchAllGenresStart = () => ({
  type: ConfigActionTypes.FETCH_ALL_GENRES_START,
});

const fetchAllGenresSuccess = (genres: Genre[]) => ({
  type: ConfigActionTypes.FETCH_ALL_GENRES_SUCCESS,
  payload: { genres },
});

const fetchAllGenresFailure = (error: string) => ({
  type: ConfigActionTypes.FETCH_ALL_GENRES_FAILURE,
  payload: { error },
});

export default {
  fetchImagesConfig,
  fetchImagesConfigStart,
  fetchImagesConfigSuccess,
  fetchImagesConfigFailure,
  fetchAllGenres,
  fetchAllGenresStart,
  fetchAllGenresSuccess,
  fetchAllGenresFailure,
};
