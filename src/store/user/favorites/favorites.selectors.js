import { createSelector } from 'reselect';

import moviesSelectors from 'store/common/movies/movies.selectors';

import userSelectors from '../user.selectors';

const selectFavorites = createSelector([userSelectors.selectUser], (user) => user.favorites);

const selectMovies = createSelector([selectFavorites], (favorites) => favorites.movies);

const selectList = createSelector([selectMovies], (movies) => moviesSelectors.selectList(movies));

const selectCurrentPage = createSelector([selectMovies], (movies) =>
  moviesSelectors.selectCurrentPage(movies),
);

const selectTotalPages = createSelector([selectMovies], (movies) =>
  moviesSelectors.selectTotalPages(movies),
);

const selectTotalResults = createSelector([selectMovies], (movies) =>
  moviesSelectors.selectTotalResults(movies),
);

export default {
  selectList,
  selectCurrentPage,
  selectTotalPages,
  selectTotalResults,
};
