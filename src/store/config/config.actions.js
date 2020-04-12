// @flow
import ConfigActionTypes from './config.types';

export const getConfig = () => ({
  type: ConfigActionTypes.GET_CONFIG,
});

export const getConfigStart = () => ({
  type: ConfigActionTypes.GET_CONFIG_START,
});

export const getConfigSuccess = (config: { imagesConfig: any, genres: string[] }) => ({
  type: ConfigActionTypes.GET_CONFIG_SUCCESS,
  payload: config,
});

export const getConfigFailure = (error: string) => ({
  type: ConfigActionTypes.GET_CONFIG_FAILURE,
  payload: { error },
});
