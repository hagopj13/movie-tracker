// @flow
import { handleActions } from 'redux-actions';

import ConfigActionTypes from './config.types';

export type Genre = { id: number, name: string };

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

const getImagesConfigSuccess = (state: State, action: any) => ({
  ...state,
  images: {
    ...state.images,
    baseImageUrl: action.payload.data.secure_base_url,
    backdropSize: getDesiredSizeFromList('w1280', action.payload.data.backdrop_sizes),
    posterSize: getDesiredSizeFromList('w500', action.payload.data.poster_sizes),
  },
});

const getAllGenresSuccess = (state: State, action: any) => ({
  ...state,
  genres: action.payload.data,
});

const actionHandler = {
  [ConfigActionTypes.GET_IMAGES_CONFIG_SUCCESS]: getImagesConfigSuccess,
  [ConfigActionTypes.GET_ALL_GENRES_SUCCESS]: getAllGenresSuccess,
};

export default handleActions(actionHandler, initialState);
