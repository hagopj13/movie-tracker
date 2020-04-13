import { createSelector } from 'reselect';

const selectResults = (state) => state.results;

const selectPagination = (state) => state.pagination;

const selectCurrentPage = createSelector([selectPagination], (pagination) => pagination.page ?? 1);

const selectTotalPages = createSelector([selectPagination], (pagination) => pagination.totalPages);

export default {
  selectResults,
  selectCurrentPage,
  selectTotalPages,
};
