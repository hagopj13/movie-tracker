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
  toggleGenreFilter,
  setReleaseYear,
} from 'store/movies/discover/discover.actions';
import { selectAllGenres } from 'store/config/config.selectors';

type Props = {
  allGenres: Array<{ id: number, name: string }>,
  selectedSortBy: string,
  selectedGenres: number[],
  selectedReleaseYear: number,
  onUpdateList: () => void,
  onSetSortBy: (string) => void,
  onToggleGenre: (number) => void,
  onSetReleaseYear: (number) => void,
};

const DiscoverMoviesFilters = (props: Props) => {
  const {
    allGenres,
    selectedSortBy,
    selectedGenres,
    selectedReleaseYear,
    onUpdateList,
    onSetSortBy,
    onToggleGenre,
    onSetReleaseYear,
  } = props;

  const handleSetSortBy = useCallback(
    (sortBy: string) => {
      onSetSortBy(sortBy);
      onUpdateList();
    },
    [onUpdateList, onSetSortBy],
  );

  const handleToggleGenre = useCallback(
    (genreId: number) => {
      onToggleGenre(genreId);
      onUpdateList();
    },
    [onUpdateList, onToggleGenre],
  );

  return (
    <MoviesFilters
      allGenres={allGenres}
      selectedSortBy={selectedSortBy}
      selectedGenres={selectedGenres}
      selectedReleaseYear={selectedReleaseYear}
      onSetSortBy={handleSetSortBy}
      onToggleGenre={handleToggleGenre}
      onSetReleaseYear={onSetReleaseYear}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  allGenres: selectAllGenres,
  selectedSortBy: selectDiscoverMoviesSortByFilter,
  selectedGenres: selectDiscoverMoviesGenresFilter,
  selectedReleaseYear: selectDiscoverMoviesReleaseYearFilter,
});

const mapDispatchToProps = {
  onSetSortBy: setSortBy,
  onToggleGenre: toggleGenreFilter,
  onSetReleaseYear: setReleaseYear,
};

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverMoviesFilters);
