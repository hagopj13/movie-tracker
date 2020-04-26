// @flow
import moviesActionsGenerator from 'store/common/movies/movies.actions';

import { namespace } from './watchlist.types';

export const moviesActions = moviesActionsGenerator(namespace);

export default {
  ...moviesActions,
};
