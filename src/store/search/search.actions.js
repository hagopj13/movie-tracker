// @flow
import moviesActionsGenerator from 'store/common/movies/movies.actions';

import SearchActionTypes, { namespace } from './search.types';

const setSearchQuery = (query: string) => ({
  type: SearchActionTypes.SET_SEARCH_QUERY,
  payload: { query },
});

export const moviesActions = moviesActionsGenerator(namespace);

export default {
  setSearchQuery,
  ...moviesActions,
};
