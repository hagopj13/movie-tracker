import moviesState from 'store/fixtures/movies';

import moviesSelectors from './movies.selectors';

describe('Movies selectors', () => {
  describe('selectList', () => {
    it('should return list of movies', () => {
      const currentState = moviesState;
      const selectedList = moviesSelectors.selectList(currentState);
      expect(selectedList).toEqual(moviesState.list);
    });
  });

  describe('selectCurrentPage', () => {
    it('should return the current page', () => {
      const currentState = moviesState;
      const selectedCurrentPage = moviesSelectors.selectCurrentPage(currentState);
      expect(selectedCurrentPage).toBe(moviesState.pagination.page);
    });
  });

  describe('selectTotalPages', () => {
    it('should return the total number of pages', () => {
      const currentState = moviesState;
      const selectedTotalPages = moviesSelectors.selectTotalPages(currentState);
      expect(selectedTotalPages).toBe(moviesState.pagination.totalPages);
    });
  });

  describe('selectTotalResults', () => {
    it('should return the total number of results', () => {
      const currentState = moviesState;
      const selectedTotalResults = moviesSelectors.selectTotalResults(currentState);
      expect(selectedTotalResults).toBe(moviesState.pagination.totalResults);
    });
  });
});
