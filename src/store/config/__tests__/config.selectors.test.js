import configSelectors from 'store/config/config.selectors';
import configState, { images as imagesConfig, genres } from 'store/fixtures/config';

describe('Config selectors', () => {
  describe('createBackdropFullPathSelector', () => {
    it('should create a backdrop full path selector', () => {
      const path = 'test.png';
      const currentState = { config: configState };
      const selectBackdropFullPath = configSelectors.createBackdropFullPathSelector(path);
      const backdropFullPath = selectBackdropFullPath(currentState);
      expect(backdropFullPath).toBe(
        `${imagesConfig.baseImageUrl}${imagesConfig.backdropSize}${path}`,
      );
    });
  });

  describe('createPosterFullPathSelector', () => {
    it('should create a poster full path selector', () => {
      const path = 'test.png';
      const currentState = { config: configState };
      const selectPosterFullPath = configSelectors.createPosterFullPathSelector(path);
      const posterFullPath = selectPosterFullPath(currentState);
      expect(posterFullPath).toBe(`${imagesConfig.baseImageUrl}${imagesConfig.posterSize}${path}`);
    });
  });

  describe('createProfileFullPathSelector', () => {
    it('should create a profile full path selector', () => {
      const path = 'test.png';
      const currentState = { config: configState };
      const selectProfileFullPath = configSelectors.createProfileFullPathSelector(path);
      const profileFullPath = selectProfileFullPath(currentState);
      expect(profileFullPath).toBe(
        `${imagesConfig.baseImageUrl}${imagesConfig.profileSize}${path}`,
      );
    });
  });

  describe('selectAllGenres', () => {
    it('should return all genres', () => {
      const currentState = { config: configState };
      const allGenres = configSelectors.selectAllGenres(currentState);
      expect(allGenres).toEqual(genres);
    });
  });
});
