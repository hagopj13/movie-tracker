// @flow
import ConfigActionTypes from './config.types';

const getImagesConfig = () => ({
  type: ConfigActionTypes.GET_IMAGES_CONFIG,
});

const getImagesConfigStart = () => ({
  type: ConfigActionTypes.GET_IMAGES_CONFIG_START,
});

const getImagesConfigSuccess = (data: any) => ({
  type: ConfigActionTypes.GET_IMAGES_CONFIG_SUCCESS,
  payload: { data },
});

const getImagesConfigFailure = (error: string) => ({
  type: ConfigActionTypes.GET_IMAGES_CONFIG_FAILURE,
  payload: { error },
});

const getAllGenres = () => ({
  type: ConfigActionTypes.GET_ALL_GENRES,
});

const getAllGenresStart = () => ({
  type: ConfigActionTypes.GET_ALL_GENRES_START,
});

const getAllGenresSuccess = (data: any) => ({
  type: ConfigActionTypes.GET_ALL_GENRES_SUCCESS,
  payload: { data },
});

const getAllGenresFailure = (error: string) => ({
  type: ConfigActionTypes.GET_ALL_GENRES_FAILURE,
  payload: { error },
});

export default {
  getImagesConfig,
  getImagesConfigStart,
  getImagesConfigSuccess,
  getImagesConfigFailure,
  getAllGenres,
  getAllGenresStart,
  getAllGenresSuccess,
  getAllGenresFailure,
};
