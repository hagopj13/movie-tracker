import { createSelector } from 'reselect';

import moviesSelectors from 'store/common/movies/movies.selectors';

const selectUpcoming = (state) => state.upcoming;

const selectMovies = createSelector([selectUpcoming], (upcoming) => upcoming.movies);

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
