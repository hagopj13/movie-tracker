// @flow
import ConfigActionTypes from './config.types';

const initialState = {
  baseImageUrl: '',
  backdropSize: '',
  posterSize: '',
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
        baseImageUrl: payload.data.images.secure_base_url,
        backdropSize: getDesiredSizeFromList('w1280', payload.data.images.backdrop_sizes),
        posterSize: getDesiredSizeFromList('w500', payload.data.images.poster_sizes),
      };
    default:
      return state;
  }
};
