// @flow
import ConfigActionTypes from './config.types';

const getConfig = () => ({
  type: ConfigActionTypes.GET_CONFIG,
});

const getConfigStart = () => ({
  type: ConfigActionTypes.GET_CONFIG_START,
});

const getConfigSuccess = (config: { imagesConfig: any, genres: string[] }) => ({
  type: ConfigActionTypes.GET_CONFIG_SUCCESS,
  payload: config,
});

const getConfigFailure = (error: string) => ({
  type: ConfigActionTypes.GET_CONFIG_FAILURE,
  payload: { error },
});

export default {
  getConfig,
  getConfigStart,
  getConfigSuccess,
  getConfigFailure,
};
