// @flow
import typesGenerator from 'store/common/utils/typesGenerator';
import MoviesActionTypes from 'store/common/movies/movies.types';

export const namespace = 'user/watchlist';

export default {
  ...typesGenerator<typeof MoviesActionTypes>(namespace, MoviesActionTypes),
};
