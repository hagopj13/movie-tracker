import { createSelector } from 'reselect';

export const selectConfig = (state) => state.config;

export const selectBaseImageUrl = createSelector([selectConfig], (config) => config.baseImageUrl);
export const selectBackdropSize = createSelector([selectConfig], (config) => config.backdropSize);
export const selectPosterSize = createSelector([selectConfig], (config) => config.posterSize);
