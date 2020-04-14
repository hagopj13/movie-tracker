// @flow
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

export default (state: State = initialState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case ConfigActionTypes.GET_IMAGES_CONFIG_SUCCESS:
      return {
        ...state,
        images: {
          ...state.images,
          baseImageUrl: payload.data.secure_base_url,
          backdropSize: getDesiredSizeFromList('w1280', payload.data.backdrop_sizes),
          posterSize: getDesiredSizeFromList('w500', payload.data.poster_sizes),
        },
      };
    case ConfigActionTypes.GET_ALL_GENRES_SUCCESS:
      return {
        ...state,
        genres: payload.data,
      };
    default:
      return state;
  }
};
