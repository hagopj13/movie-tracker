import moviesState from 'store/fixtures/movies';

import searchSelectors from './search.selectors';

const currentState = {
  search: {
    query: 'someQuery',
    movies: moviesState,
  },
};

describe('Search selectors', () => {
  describe('selectQuery', () => {
    it('should return the query', () => {
      const selectedQuery = searchSelectors.selectQuery(currentState);
      expect(selectedQuery).toBe(currentState.search.query);
    });
  });

  describe('selectList', () => {
    it('should return list of movies', () => {
      const selectedList = searchSelectors.selectList(currentState);
      expect(selectedList).toEqual(moviesState.list);
    });
  });

  describe('selectCurrentPage', () => {
    it('should return the current page', () => {
      const selectedCurrentPage = searchSelectors.selectCurrentPage(currentState);
      expect(selectedCurrentPage).toBe(moviesState.pagination.page);
    });
  });

  describe('selectTotalPages', () => {
    it('should return the total number of pages', () => {
      const selectedTotalPages = searchSelectors.selectTotalPages(currentState);
      expect(selectedTotalPages).toBe(moviesState.pagination.totalPages);
    });
  });

  describe('selectTotalResults', () => {
    it('should return the total number of results', () => {
      const selectedTotalResults = searchSelectors.selectTotalResults(currentState);
      expect(selectedTotalResults).toBe(moviesState.pagination.totalResults);
    });
  });
});
