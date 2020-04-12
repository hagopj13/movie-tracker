// @flow
import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import MoviesFilters from 'components/Movies/MoviesFilters/MoviesFilters';
import {
  selectDiscoverMoviesSortByFilter,
  selectDiscoverMoviesGenresFilter,
  selectDiscoverMoviesReleaseYearFilter,
} from 'store/movies/discover/discover.selectors';
import {
  setSortBy,
  addGenreToFilterList,
  removeGenreFromFilterList,
  setReleaseYear,
} from 'store/movies/discover/discover.actions';

type Props = {
  selectedSortBy: string,
  selectedGenres: number[],
  selectedReleaseYear: number,
  onUpdateList: () => void,
  onSetSortBy: (string) => void,
  onAddGenre: (number) => void,
  onRemoveGenre: (number) => void,
  onSetReleaseYear: (number) => void,
};

const DiscoverMoviesFilters = (props: Props) => {
  const {
    selectedSortBy,
    selectedGenres,
    selectedReleaseYear,
    onUpdateList,
    onSetSortBy,
    onAddGenre,
    onRemoveGenre,
    onSetReleaseYear,
  } = props;

  const handleSetSortBy = useCallback(
    (sortBy: string) => {
      onSetSortBy(sortBy);
      onUpdateList();
    },
    [onUpdateList, onSetSortBy],
  );

  return (
    <MoviesFilters
      selectedSortBy={selectedSortBy}
      selectedGenres={selectedGenres}
      selectedReleaseYear={selectedReleaseYear}
      onSetSortBy={handleSetSortBy}
      onAddGenre={onAddGenre}
      onRemoveGenre={onRemoveGenre}
      onSetReleaseYear={onSetReleaseYear}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  selectedSortBy: selectDiscoverMoviesSortByFilter,
  selectedGenres: selectDiscoverMoviesGenresFilter,
  selectedReleaseYear: selectDiscoverMoviesReleaseYearFilter,
});

const mapDispatchToProps = {
  onSetSortBy: setSortBy,
  onAddGenre: addGenreToFilterList,
  onRemoveGenre: removeGenreFromFilterList,
  onSetReleaseYear: setReleaseYear,
};

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverMoviesFilters);
