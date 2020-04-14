// @flow
import moviesActionsGenerator from 'store/common/movies/movies.actions';
import filtersActionsGenerator from 'store/common/filters/filters.actions';

import { namespace } from './discover.types';

export const moviesActions = moviesActionsGenerator(namespace);
export const filtersActions = filtersActionsGenerator(namespace);

export default {
  ...moviesActions,
  ...filtersActions,
};
