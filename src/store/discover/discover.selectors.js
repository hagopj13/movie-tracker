import { createSelector } from 'reselect';

import moviesSelectors from 'store/common/movies/movies.selectors';
import filtersSelectors from 'store/common/filters/filters.selectors';

const selectDiscover = (state) => state.discover;

const selectMovies = createSelector([selectDiscover], (discover) => discover.movies);

const selectFilters = createSelector([selectDiscover], (discover) => discover.filters);

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

const selectSortBy = createSelector([selectFilters], (filters) =>
  filtersSelectors.selectSortBy(filters),
);

const selectGenres = createSelector([selectFilters], (filters) =>
  filtersSelectors.selectGenres(filters),
);

const selectReleaseDateStart = createSelector([selectFilters], (filters) =>
  filtersSelectors.selectReleaseDateStart(filters),
);

const selectReleaseDateEnd = createSelector([selectFilters], (filters) =>
  filtersSelectors.selectReleaseDateEnd(filters),
);

export default {
  selectFilters,
  selectList,
  selectCurrentPage,
  selectTotalPages,
  selectTotalResults,
  selectSortBy,
  selectGenres,
  selectReleaseDateStart,
  selectReleaseDateEnd,
};
