// @flow
import moviesActionsGenerator from 'store/common/movies/movies.actions';
import filtersActionsGenerator from 'store/common/filters/filters.actions';

import { namespace } from './discover.types';

const moviesActions = moviesActionsGenerator(namespace);
const filtersActions = filtersActionsGenerator(namespace);

export default {
  ...moviesActions,
  ...filtersActions,
};
