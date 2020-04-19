// @flow
import { handleActions } from 'redux-actions';

import type { Genre } from 'types';

import ConfigActionTypes from './config.types';

type State = {
  images: {
    baseImageUrl: string,
    backdropSize: string,
    posterSize: string,
  },
  genres: Genre[],
};

const initialState: State = {
  images: {
    baseImageUrl: '',
    backdropSize: '',
    posterSize: '',
  },
  genres: [],
};

const getDesiredSizeFromList = (desiredSize: string, sizesList: string[]): string => {
  if (sizesList.includes(desiredSize)) {
    return desiredSize;
  }
  return sizesList.length > 1 ? sizesList[sizesList.length - 2] : 'original';
};

const fetchImagesConfigSuccess = (state: State, action: any) => ({
  ...state,
  images: {
    ...state.images,
    baseImageUrl: action.payload.data.secure_base_url,
    backdropSize: getDesiredSizeFromList('w1280', action.payload.data.backdrop_sizes),
    posterSize: getDesiredSizeFromList('w500', action.payload.data.poster_sizes),
  },
});

const fetchAllGenresSuccess = (state: State, action: any) => ({
  ...state,
  genres: action.payload.data,
});

const actionHandler = {
  [ConfigActionTypes.FETCH_IMAGES_CONFIG_SUCCESS]: fetchImagesConfigSuccess,
  [ConfigActionTypes.FETCH_ALL_GENRES_SUCCESS]: fetchAllGenresSuccess,
};

export default handleActions(actionHandler, initialState);
