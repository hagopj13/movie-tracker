const selectSortBy = (state) => state.sortBy;

const selectGenres = (state) => state.genres;

const selectReleaseDateStart = (state) => state.releaseDateStart;

const selectReleaseDateEnd = (state) => state.releaseDateEnd;

export default {
  selectSortBy,
  selectGenres,
  selectReleaseDateStart,
  selectReleaseDateEnd,
};
