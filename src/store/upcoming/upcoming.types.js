// @flow
import typesGenerator from 'store/common/utils/typesGenerator';
import MoviesActionTypes from 'store/common/movies/movies.types';

export const namespace = 'upcoming';

export default {
  ...typesGenerator<typeof MoviesActionTypes>(namespace, MoviesActionTypes),
};
