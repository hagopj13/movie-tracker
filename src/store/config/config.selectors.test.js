import configState, { images as imagesConfig, genres } from 'store/fixtures/config';

import configSelectors from './config.selectors';

describe('Config selectors', () => {
  describe('createBackdropFullPathSelector', () => {
    it('should create a backdrop full path selector', () => {
      const path = 'test.png';
      const currentState = { config: configState };
      const selectBackdropFullPath = configSelectors.createBackdropFullPathSelector(path);
      const selectedBackdropFullPath = selectBackdropFullPath(currentState);
      expect(selectedBackdropFullPath).toBe(
        `${imagesConfig.baseImageUrl}${imagesConfig.backdropSize}${path}`,
      );
    });
  });

  describe('createPosterFullPathSelector', () => {
    it('should create a poster full path selector', () => {
      const path = 'test.png';
      const currentState = { config: configState };
      const selectPosterFullPath = configSelectors.createPosterFullPathSelector(path);
      const selectedPosterFullPath = selectPosterFullPath(currentState);
      expect(selectedPosterFullPath).toBe(
        `${imagesConfig.baseImageUrl}${imagesConfig.posterSize}${path}`,
      );
    });
  });

  describe('createProfileFullPathSelector', () => {
    it('should create a profile full path selector', () => {
      const path = 'test.png';
      const currentState = { config: configState };
      const selectProfileFullPath = configSelectors.createProfileFullPathSelector(path);
      const selectedProfileFullPath = selectProfileFullPath(currentState);
      expect(selectedProfileFullPath).toBe(
        `${imagesConfig.baseImageUrl}${imagesConfig.profileSize}${path}`,
      );
    });
  });

  describe('selectAllGenres', () => {
    it('should return all genres', () => {
      const currentState = { config: configState };
      const selectedAllGenres = configSelectors.selectAllGenres(currentState);
      expect(selectedAllGenres).toEqual(genres);
    });
  });
});
