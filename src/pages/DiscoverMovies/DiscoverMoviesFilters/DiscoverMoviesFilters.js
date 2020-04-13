// @flow
import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import type { Moment } from 'moment';

import MoviesFilters from 'components/Movies/MoviesFilters/MoviesFilters';
import {
  selectDiscoverMoviesSortByFilter,
  selectDiscoverMoviesGenresFilter,
  selectDiscoverMoviesReleaseDateStart,
  selectDiscoverMoviesReleaseDateEnd,
} from 'store/movies/discover/discover.selectors';
import {
  setSortBy,
  toggleGenreFilter,
  setReleaseDateStart,
  setReleaseDateEnd,
} from 'store/movies/discover/discover.actions';
import { selectAllGenres } from 'store/config/config.selectors';

type Props = {
  allGenres: Array<{ id: number, name: string }>,
  selectedSortBy: string,
  selectedGenres: number[],
  selectedReleaseDateStart: Moment,
  selectedReleaseDateEnd: Moment,
  onUpdateList: () => void,
  onSetSortBy: (string) => void,
  onToggleGenre: (number) => void,
  onSetReleaseDateStart: (date: Moment) => void,
  onSetReleaseDateEnd: (date: Moment) => void,
};

const DiscoverMoviesFilters = (props: Props) => {
  const {
    allGenres,
    selectedSortBy,
    selectedGenres,
    selectedReleaseDateStart,
    selectedReleaseDateEnd,
    onUpdateList,
    onSetSortBy,
    onToggleGenre,
    onSetReleaseDateStart,
    onSetReleaseDateEnd,
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

  const handleSetReleaseDateStart = useCallback(
    (date: Moment) => {
      onSetReleaseDateStart(date);
      onUpdateList();
    },
    [onUpdateList, onSetReleaseDateStart],
  );

  const handleSetReleaseDateEnd = useCallback(
    (date: Moment) => {
      onSetReleaseDateEnd(date);
      onUpdateList();
    },
    [onUpdateList, onSetReleaseDateEnd],
  );

  return (
    <MoviesFilters
      allGenres={allGenres}
      selectedSortBy={selectedSortBy}
      selectedGenres={selectedGenres}
      selectedReleaseDateStart={selectedReleaseDateStart}
      selectedReleaseDateEnd={selectedReleaseDateEnd}
      onSetSortBy={handleSetSortBy}
      onToggleGenre={handleToggleGenre}
      onSetReleaseDateStart={handleSetReleaseDateStart}
      onSetReleaseDateEnd={handleSetReleaseDateEnd}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  allGenres: selectAllGenres,
  selectedSortBy: selectDiscoverMoviesSortByFilter,
  selectedGenres: selectDiscoverMoviesGenresFilter,
  selectedReleaseDateStart: selectDiscoverMoviesReleaseDateStart,
  selectedReleaseDateEnd: selectDiscoverMoviesReleaseDateEnd,
});

const mapDispatchToProps = {
  onSetSortBy: setSortBy,
  onToggleGenre: toggleGenreFilter,
  onSetReleaseDateStart: setReleaseDateStart,
  onSetReleaseDateEnd: setReleaseDateEnd,
};

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverMoviesFilters);
