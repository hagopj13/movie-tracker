import { createSelector } from 'reselect';

const selectConfig = (state) => state.config;

const selectImagesConfig = createSelector([selectConfig], (config) => config.images);

const selectBaseImageUrl = createSelector(
  [selectImagesConfig],
  (imagesConfig) => imagesConfig.baseImageUrl,
);

const selectBackdropSize = createSelector(
  [selectImagesConfig],
  (imagesConfig) => imagesConfig.backdropSize,
);

const selectPosterSize = createSelector(
  [selectImagesConfig],
  (imagesConfig) => imagesConfig.posterSize,
);

const createBackdropFullPathSelector = (backdropPath: string) => {
  return createSelector(
    [selectBaseImageUrl, selectBackdropSize],
    (baseImageUrl, backdropSize) => `${baseImageUrl}${backdropSize}${backdropPath}`,
  );
};

const createPosterFullPathSelector = (posterPath: string) => {
  return createSelector(
    [selectBaseImageUrl, selectPosterSize],
    (baseImageUrl, posterSize) => `${baseImageUrl}${posterSize}${posterPath}`,
  );
};

const selectAllGenres = createSelector([selectConfig], (config) => config.genres);

export default {
  createBackdropFullPathSelector,
  createPosterFullPathSelector,
  selectAllGenres,
};
