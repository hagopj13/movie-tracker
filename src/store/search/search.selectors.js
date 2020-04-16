import { createSelector } from 'reselect';

import moviesSelectors from 'store/common/movies/movies.selectors';

const selectSearch = (state) => state.search;

const selectQuery = createSelector([selectSearch], (search) => search.query);

const selectMovies = createSelector([selectSearch], (search) => search.movies);

const selectResults = createSelector([selectMovies], (movies) =>
  moviesSelectors.selectResults(movies),
);

const selectCurrentPage = createSelector([selectMovies], (movies) =>
  moviesSelectors.selectCurrentPage(movies),
);

const selectTotalPages = createSelector([selectMovies], (movies) =>
  moviesSelectors.selectTotalPages(movies),
);

export default {
  selectQuery,
  selectResults,
  selectCurrentPage,
  selectTotalPages,
};
