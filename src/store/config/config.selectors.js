import { createSelector } from 'reselect';

export const selectConfig = (state) => state.config;

export const selectImagesConfig = createSelector([selectConfig], (config) => config.images);

export const selectBaseImageUrl = createSelector(
  [selectImagesConfig],
  (imagesConfig) => imagesConfig.baseImageUrl,
);

export const selectBackdropSize = createSelector(
  [selectImagesConfig],
  (imagesConfig) => imagesConfig.backdropSize,
);

export const selectPosterSize = createSelector(
  [selectImagesConfig],
  (imagesConfig) => imagesConfig.posterSize,
);

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

export const selectAllGenres = createSelector([selectConfig], (config) => config.genres);
