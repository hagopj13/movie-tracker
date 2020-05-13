import moviesState from 'store/fixtures/movies';

import watchlistSelectors from './watchlist.selectors';

const currentState = {
  user: {
    watchlist: {
      movies: moviesState,
    },
  },
};

describe('Watchlist selectors', () => {
  describe('selectList', () => {
    it('should return list of movies', () => {
      const selectedList = watchlistSelectors.selectList(currentState);
      expect(selectedList).toEqual(moviesState.list);
    });
  });

  describe('selectCurrentPage', () => {
    it('should return the current page', () => {
      const selectedCurrentPage = watchlistSelectors.selectCurrentPage(currentState);
      expect(selectedCurrentPage).toBe(moviesState.pagination.page);
    });
  });

  describe('selectTotalPages', () => {
    it('should return the total number of pages', () => {
      const selectedTotalPages = watchlistSelectors.selectTotalPages(currentState);
      expect(selectedTotalPages).toBe(moviesState.pagination.totalPages);
    });
  });

  describe('selectTotalResults', () => {
    it('should return the total number of results', () => {
      const selectedTotalResults = watchlistSelectors.selectTotalResults(currentState);
      expect(selectedTotalResults).toBe(moviesState.pagination.totalResults);
    });
  });
});
