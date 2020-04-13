// @flow
import ConfigActionTypes from './config.types';

const initialState = {
  images: {
    baseImageUrl: '',
    backdropSize: '',
    posterSize: '',
  },
  genres: [],
};

const getDesiredSizeFromList = (desiredSize, sizesList) => {
  if (sizesList.includes(desiredSize)) {
    return desiredSize;
  }
  return sizesList.length > 1 ? sizesList[sizesList.length - 2] : 'original';
};

export default (state = initialState, action) => {
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
