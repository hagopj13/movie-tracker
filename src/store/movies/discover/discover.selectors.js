import { createSelector } from 'reselect';

import { selectMovies } from '../movies.selectors';

export const selectDiscoverMovies = createSelector([selectMovies], (movies) => movies.discover);

export const selectDiscoverMoviesList = createSelector(
  [selectDiscoverMovies],
  (discoverMovies) => discoverMovies.list,
);
