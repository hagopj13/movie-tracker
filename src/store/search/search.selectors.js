import { createSelector } from 'reselect';

import moviesSelectors from 'store/common/movies/movies.selectors';

const selectSearch = (state) => state.search;

const selectQuery = createSelector([selectSearch], (search) => search.query);

const selectMovies = createSelector([selectSearch], (search) => search.movies);

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
  selectQuery,
  selectList,
  selectCurrentPage,
  selectTotalPages,
  selectTotalResults,
};
