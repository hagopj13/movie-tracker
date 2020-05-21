// @flow
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import type { Moment } from 'moment';

import MovieFilters from 'components/Movie/Filters/MovieFilters';
import discoverActions from 'store/discover/discover.actions';
import discoverSelectors from 'store/discover/discover.selectors';
import configSelectors from 'store/config/config.selectors';
import type { State as FiltersState } from 'store/common/filters/filters.reducer';
import type { Genre } from 'types';

type Props = {
  allGenres: Genre[],
  selectedFilters: FiltersState,
  onUpdateResults: () => void,
  onSetSortBy: (sortBy: string) => void,
  onToggleGenre: (genreId: number) => void,
  onSetReleaseDateStart: (releaseDateStart: Moment) => void,
  onSetReleaseDateEnd: (releaseDateEnd: Moment) => void,
};

export const DiscoverMoviesFilters = (props: Props) => {
  const {
    allGenres,
    selectedFilters,
    onUpdateResults,
    onSetSortBy,
    onToggleGenre,
    onSetReleaseDateStart,
    onSetReleaseDateEnd,
  } = props;

  return (
    <MovieFilters
      allGenres={allGenres}
      selectedFilters={selectedFilters}
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
  selectedFilters: discoverSelectors.selectFilters,
});

const mapDispatchToProps = {
  onUpdateResults: discoverActions.fetchMovies,
  onSetSortBy: discoverActions.setSortBy,
  onToggleGenre: discoverActions.toggleGenre,
  onSetReleaseDateStart: discoverActions.setReleaseDateStart,
  onSetReleaseDateEnd: discoverActions.setReleaseDateEnd,
};

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverMoviesFilters);
