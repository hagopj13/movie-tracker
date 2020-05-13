import { images as imagesConfig, genres } from 'store/fixtures/config';

import configReducer, { initialState } from './config.reducer';
import ConfigActionTypes from './config.types';

describe('Config reducer', () => {
  it('should return the initial state', () => {
    const state = configReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });

  it('should set the images config on fetchImagesConfigSuccess action', () => {
    const action = {
      type: ConfigActionTypes.FETCH_IMAGES_CONFIG_SUCCESS,
      payload: { imagesConfig },
    };
    const state = configReducer(initialState, action);
    expect(state.images).toEqual(imagesConfig);
  });

  it('should set the genres on fetchAllGenresSuccess action', () => {
    const action = {
      type: ConfigActionTypes.FETCH_ALL_GENRES_SUCCESS,
      payload: { genres },
    };
    const state = configReducer(initialState, action);
    expect(state.genres).toEqual(genres);
  });
});
