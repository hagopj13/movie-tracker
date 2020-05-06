// @flow
import { handleActions } from 'redux-actions';

import type { ImagesConfig, Genre } from 'types';

import ConfigActionTypes from './config.types';

type State = {
  images: ImagesConfig,
  genres: Genre[],
};

export const initialState: State = {
  images: {
    baseImageUrl: '',
    backdropSize: '',
    posterSize: '',
    profileSize: '',
  },
  genres: [],
};

const fetchImagesConfigSuccess = (state: State, action: any) => ({
  ...state,
  images: action.payload.imagesConfig,
});

const fetchAllGenresSuccess = (state: State, action: any) => ({
  ...state,
  genres: action.payload.genres,
});

const actionHandler = {
  [ConfigActionTypes.FETCH_IMAGES_CONFIG_SUCCESS]: fetchImagesConfigSuccess,
  [ConfigActionTypes.FETCH_ALL_GENRES_SUCCESS]: fetchAllGenresSuccess,
};

export default handleActions(actionHandler, initialState);
