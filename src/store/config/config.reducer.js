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
    case ConfigActionTypes.GET_CONFIG_SUCCESS:
      return {
        ...state,
        images: {
          ...state.images,
          baseImageUrl: payload.imagesConfig.secure_base_url,
          backdropSize: getDesiredSizeFromList('w1280', payload.imagesConfig.backdrop_sizes),
          posterSize: getDesiredSizeFromList('w500', payload.imagesConfig.poster_sizes),
        },
        genres: payload.genres,
      };
    default:
      return state;
  }
};
