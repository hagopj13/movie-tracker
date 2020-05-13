import moviesState from 'store/fixtures/movies';

import upcomingSelectors from './upcoming.selectors';

const currentState = {
  upcoming: {
    movies: moviesState,
  },
};

describe('Upcoming selectors', () => {
  describe('selectList', () => {
    it('should return list of movies', () => {
      const selectedList = upcomingSelectors.selectList(currentState);
      expect(selectedList).toEqual(moviesState.list);
    });
  });

  describe('selectCurrentPage', () => {
    it('should return the current page', () => {
      const selectedCurrentPage = upcomingSelectors.selectCurrentPage(currentState);
      expect(selectedCurrentPage).toBe(moviesState.pagination.page);
    });
  });

  describe('selectTotalPages', () => {
    it('should return the total number of pages', () => {
      const selectedTotalPages = upcomingSelectors.selectTotalPages(currentState);
      expect(selectedTotalPages).toBe(moviesState.pagination.totalPages);
    });
  });

  describe('selectTotalResults', () => {
    it('should return the total number of results', () => {
      const selectedTotalResults = upcomingSelectors.selectTotalResults(currentState);
      expect(selectedTotalResults).toBe(moviesState.pagination.totalResults);
    });
  });
});
