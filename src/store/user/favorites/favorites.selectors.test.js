import moviesState from 'store/fixtures/movies';

import favoritesSelectors from './favorites.selectors';

const currentState = {
  user: {
    favorites: {
      movies: moviesState,
    },
  },
};

describe('Favorites selectors', () => {
  describe('selectList', () => {
    it('should return list of movies', () => {
      const selectedList = favoritesSelectors.selectList(currentState);
      expect(selectedList).toEqual(moviesState.list);
    });
  });

  describe('selectCurrentPage', () => {
    it('should return the current page', () => {
      const selectedCurrentPage = favoritesSelectors.selectCurrentPage(currentState);
      expect(selectedCurrentPage).toBe(moviesState.pagination.page);
    });
  });

  describe('selectTotalPages', () => {
    it('should return the total number of pages', () => {
      const selectedTotalPages = favoritesSelectors.selectTotalPages(currentState);
      expect(selectedTotalPages).toBe(moviesState.pagination.totalPages);
    });
  });

  describe('selectTotalResults', () => {
    it('should return the total number of results', () => {
      const selectedTotalResults = favoritesSelectors.selectTotalResults(currentState);
      expect(selectedTotalResults).toBe(moviesState.pagination.totalResults);
    });
  });
});
