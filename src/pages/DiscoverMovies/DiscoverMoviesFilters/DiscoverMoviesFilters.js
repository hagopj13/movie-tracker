// @flow
import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import type { Moment } from 'moment';

import MoviesFilters from 'components/Movies/MoviesFilters/MoviesFilters';
import discoverActions from 'store/discover/discover.actions';
import discoverSelectors from 'store/discover/discover.selectors';
import { selectAllGenres } from 'store/config/config.selectors';

type Props = {
  allGenres: Array<{ id: number, name: string }>,
  selectedSortBy: string,
  selectedGenres: number[],
  selectedReleaseDateStart: Moment,
  selectedReleaseDateEnd: Moment,
  onUpdateResults: () => void,
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
    onUpdateResults,
    onSetSortBy,
    onToggleGenre,
    onSetReleaseDateStart,
    onSetReleaseDateEnd,
  } = props;

  const handleSetSortBy = useCallback(
    (sortBy: string) => {
      onSetSortBy(sortBy);
      onUpdateResults();
    },
    [onUpdateResults, onSetSortBy],
  );

  const handleToggleGenre = useCallback(
    (genreId: number) => {
      onToggleGenre(genreId);
      onUpdateResults();
    },
    [onUpdateResults, onToggleGenre],
  );

  const handleSetReleaseDateStart = useCallback(
    (date: Moment) => {
      onSetReleaseDateStart(date);
      onUpdateResults();
    },
    [onUpdateResults, onSetReleaseDateStart],
  );

  const handleSetReleaseDateEnd = useCallback(
    (date: Moment) => {
      onSetReleaseDateEnd(date);
      onUpdateResults();
    },
    [onUpdateResults, onSetReleaseDateEnd],
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
  selectedSortBy: discoverSelectors.selectSortBy,
  selectedGenres: discoverSelectors.selectGenres,
  selectedReleaseDateStart: discoverSelectors.selectReleaseDateStart,
  selectedReleaseDateEnd: discoverSelectors.selectReleaseDateEnd,
});

const mapDispatchToProps = {
  onUpdateResults: discoverActions.fetchMovies,
  onSetSortBy: discoverActions.setSortBy,
  onToggleGenre: discoverActions.toggleGenre,
  onSetReleaseDateStart: discoverActions.setReleaseDateStart,
  onSetReleaseDateEnd: discoverActions.setReleaseDateEnd,
};

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverMoviesFilters);
