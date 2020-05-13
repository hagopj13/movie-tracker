import filtersState from 'store/fixtures/filters';

import filtersSelectors from './filters.selectors';

describe('Filters selectors', () => {
  describe('selectSortBy', () => {
    it('should return the sortBy filter', () => {
      const selectedSortBy = filtersSelectors.selectSortBy(filtersState);
      expect(selectedSortBy).toBe(filtersState.sortBy);
    });
  });

  describe('selectGenres', () => {
    it('should return the genres filter', () => {
      const selectedGenres = filtersSelectors.selectGenres(filtersState);
      expect(selectedGenres).toEqual(filtersState.genres);
    });
  });

  describe('selectReleaseDateStart', () => {
    it('should return the release date start filter', () => {
      const selectedReleaseDateStart = filtersSelectors.selectReleaseDateStart(filtersState);
      expect(selectedReleaseDateStart).toEqual(filtersState.releaseDateStart);
    });
  });

  describe('selectReleaseDateEnd', () => {
    it('should return the release date end filter', () => {
      const selectedReleaseDateEnd = filtersSelectors.selectReleaseDateEnd(filtersState);
      expect(selectedReleaseDateEnd).toEqual(filtersState.releaseDateEnd);
    });
  });
});
