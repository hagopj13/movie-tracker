import moviesState from 'store/fixtures/movies';
import filtersState from 'store/fixtures/filters';

import discoverSelectors from './discover.selectors';

const currentState = {
  discover: {
    movies: moviesState,
    filters: filtersState,
  },
};

describe('Discover selectors', () => {
  describe('selectList', () => {
    it('should return list of movies', () => {
      const selectedList = discoverSelectors.selectList(currentState);
      expect(selectedList).toEqual(moviesState.list);
    });
  });

  describe('selectCurrentPage', () => {
    it('should return the current page', () => {
      const selectedCurrentPage = discoverSelectors.selectCurrentPage(currentState);
      expect(selectedCurrentPage).toBe(moviesState.pagination.page);
    });
  });

  describe('selectTotalPages', () => {
    it('should return the total number of pages', () => {
      const selectedTotalPages = discoverSelectors.selectTotalPages(currentState);
      expect(selectedTotalPages).toBe(moviesState.pagination.totalPages);
    });
  });

  describe('selectTotalResults', () => {
    it('should return the total number of results', () => {
      const selectedTotalResults = discoverSelectors.selectTotalResults(currentState);
      expect(selectedTotalResults).toBe(moviesState.pagination.totalResults);
    });
  });

  describe('selectFilters', () => {
    it('should return the filters', () => {
      const selectedFilters = discoverSelectors.selectFilters(currentState);
      expect(selectedFilters).toEqual(filtersState);
    });
  });

  describe('selectSortBy', () => {
    it('should return the sortBy filter', () => {
      const selectedSortBy = discoverSelectors.selectSortBy(currentState);
      expect(selectedSortBy).toBe(filtersState.sortBy);
    });
  });

  describe('selectGenres', () => {
    it('should return the genres filter', () => {
      const selectedGenres = discoverSelectors.selectGenres(currentState);
      expect(selectedGenres).toEqual(filtersState.genres);
    });
  });

  describe('selectReleaseDateStart', () => {
    it('should return the release date start filter', () => {
      const selectedReleaseDateStart = discoverSelectors.selectReleaseDateStart(currentState);
      expect(selectedReleaseDateStart).toEqual(filtersState.releaseDateStart);
    });
  });

  describe('selectReleaseDateEnd', () => {
    it('should return the release date end filter', () => {
      const selectedReleaseDateEnd = discoverSelectors.selectReleaseDateEnd(currentState);
      expect(selectedReleaseDateEnd).toEqual(filtersState.releaseDateEnd);
    });
  });
});
