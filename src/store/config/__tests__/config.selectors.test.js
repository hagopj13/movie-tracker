import configSelectors from 'store/config/config.selectors';
import configState, { images as imagesConfig, genres } from 'store/fixtures/config';

describe('Config selectors', () => {
  const testState = {
    config: configState,
  };

  describe('createBackdropFullPathSelector', () => {
    it('should create a backdrop full path selector', () => {
      const path = 'test.png';
      const selectBackdropFullPath = configSelectors.createBackdropFullPathSelector(path);
      const backdropFullPath = selectBackdropFullPath(testState);
      expect(backdropFullPath).toBe(
        `${imagesConfig.baseImageUrl}${imagesConfig.backdropSize}${path}`,
      );
    });
  });

  describe('createPosterFullPathSelector', () => {
    it('should create a poster full path selector', () => {
      const path = 'test.png';
      const selectPosterFullPath = configSelectors.createPosterFullPathSelector(path);
      const posterFullPath = selectPosterFullPath(testState);
      expect(posterFullPath).toBe(`${imagesConfig.baseImageUrl}${imagesConfig.posterSize}${path}`);
    });
  });

  describe('createProfileFullPathSelector', () => {
    it('should create a profile full path selector', () => {
      const path = 'test.png';
      const selectProfileFullPath = configSelectors.createProfileFullPathSelector(path);
      const profileFullPath = selectProfileFullPath(testState);
      expect(profileFullPath).toBe(
        `${imagesConfig.baseImageUrl}${imagesConfig.profileSize}${path}`,
      );
    });
  });

  describe('selectAllGenres', () => {
    it('should return all genres', () => {
      const allGenres = configSelectors.selectAllGenres(testState);
      expect(allGenres).toEqual(genres);
    });
  });
});
