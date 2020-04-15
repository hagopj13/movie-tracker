// @flow
import moviesActionsGenerator from 'store/common/movies/movies.actions';

import { namespace } from './upcoming.types';

export const moviesActions = moviesActionsGenerator(namespace);

export default {
  ...moviesActions,
};
