import { createSelector } from 'reselect';

import moviesSelectors from 'store/common/movies/movies.selectors';

const selectUpcoming = (state) => state.upcoming;

const selectMovies = createSelector([selectUpcoming], (upcoming) => upcoming.movies);

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
  selectResults,
  selectCurrentPage,
  selectTotalPages,
};
