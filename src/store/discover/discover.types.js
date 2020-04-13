// @flow
import typesGenerator from 'store/common/utils/typesGenerator';
import MoviesActionTypes from 'store/common/movies/movies.types';
import FiltersActionTypes from 'store/common/filters/filters.types';

export const namespace = 'discover';

export default {
  ...typesGenerator(namespace, MoviesActionTypes),
  ...typesGenerator(namespace, FiltersActionTypes),
};
