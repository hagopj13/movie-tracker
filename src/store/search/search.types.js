// @flow
import typesGenerator from 'store/common/utils/typesGenerator';
import MoviesActionTypes from 'store/common/movies/movies.types';

export const namespace = 'search';

export default {
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  ...typesGenerator<typeof MoviesActionTypes>(namespace, MoviesActionTypes),
};
