import { createSelector } from 'reselect';

const selectList = (state) => state.list;

const selectPagination = (state) => state.pagination;

const selectCurrentPage = createSelector([selectPagination], (pagination) => pagination?.page ?? 1);

const selectTotalPages = createSelector(
  [selectPagination],
  (pagination) => pagination?.totalPages ?? 0,
);

const selectTotalResults = createSelector(
  [selectPagination],
  (pagination) => pagination?.totalResults ?? 0,
);

export default {
  selectList,
  selectCurrentPage,
  selectTotalPages,
  selectTotalResults,
};
