// @flow
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import type { Moment } from 'moment';

import MoviesFilters from 'components/Movies/MoviesFilters/MoviesFilters';
import discoverActions from 'store/discover/discover.actions';
import discoverSelectors from 'store/discover/discover.selectors';
import configSelectors from 'store/config/config.selectors';

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

  return (
    <MoviesFilters
      allGenres={allGenres}
      selectedSortBy={selectedSortBy}
      selectedGenres={selectedGenres}
      selectedReleaseDateStart={selectedReleaseDateStart}
      selectedReleaseDateEnd={selectedReleaseDateEnd}
      onFiltersChanged={onUpdateResults}
      onSetSortBy={onSetSortBy}
      onToggleGenre={onToggleGenre}
      onSetReleaseDateStart={onSetReleaseDateStart}
      onSetReleaseDateEnd={onSetReleaseDateEnd}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  allGenres: configSelectors.selectAllGenres,
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
