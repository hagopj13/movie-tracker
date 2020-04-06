import { createSelector } from 'reselect';

export const selectConfig = (state) => state.config;

export const selectBaseImageUrl = createSelector([selectConfig], (config) => config.baseImageUrl);

export const selectBackdropSize = createSelector([selectConfig], (config) => config.backdropSize);

export const selectPosterSize = createSelector([selectConfig], (config) => config.posterSize);

export const createBackdropFullPathSelector = (backdropPath: string) => {
  return createSelector(
    [selectBaseImageUrl, selectBackdropSize],
    (baseImageUrl, backdropSize) => `${baseImageUrl}${backdropSize}${backdropPath}`,
  );
};

export const createPosterFullPathSelector = (posterPath: string) => {
  return createSelector(
    [selectBaseImageUrl, selectPosterSize],
    (baseImageUrl, posterSize) => `${baseImageUrl}${posterSize}${posterPath}`,
  );
};
