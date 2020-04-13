import { createSelector } from 'reselect';

import { selectMovies } from '../movies.selectors';

export const selectDiscoverMovies = createSelector([selectMovies], (movies) => movies.discover);

export const selectDiscoverMoviesList = createSelector(
  [selectDiscoverMovies],
  (discoverMovies) => discoverMovies.list,
);

export const selectDiscoverMoviesCurrentPage = createSelector(
  [selectDiscoverMovies],
  (discoverMovies) => discoverMovies.pagination.page ?? 1,
);

export const selectDiscoverMoviesTotalPages = createSelector(
  [selectDiscoverMovies],
  (discoverMovies) => discoverMovies.pagination.totalPages,
);

export const selectDiscoverMoviesFilters = createSelector(
  [selectDiscoverMovies],
  (discoverMovies) => discoverMovies.filters,
);

export const selectDiscoverMoviesSortByFilter = createSelector(
  [selectDiscoverMoviesFilters],
  (filters) => filters.sortBy,
);

export const selectDiscoverMoviesGenresFilter = createSelector(
  [selectDiscoverMoviesFilters],
  (filters) => filters.genres,
);

export const selectDiscoverMoviesReleaseDateStart = createSelector(
  [selectDiscoverMoviesFilters],
  (filters) => filters.releaseDateStart,
);

export const selectDiscoverMoviesReleaseDateEnd = createSelector(
  [selectDiscoverMoviesFilters],
  (filters) => filters.releaseDateEnd,
);
