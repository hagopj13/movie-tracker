// @flow
import React, { useCallback } from 'react';
import type { Moment } from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

import FilterBox from 'components/Filter/FilterBox/FilterBox';
import FilterBoxItem from 'components/Filter/FilterBoxItem/FilterBoxItem';
import ChipsList from 'components/Input/ChipsList/ChipsList';
import DatePicker from 'components/Input/DatePicker/DatePicker';
import type { State as FiltersState } from 'store/common/filters/filters.reducer';
import type { Genre } from 'store/config/config.reducer';

import SortBySelect from './SortBySelect/SortBySelect';

type Props = {
  allGenres: Genre[],
  selectedFilters: FiltersState,
  onFiltersChanged: () => void,
  onSetSortBy: (sortBy: string) => void,
  onToggleGenre: (genreId: number) => void,
  onSetReleaseDateStart: (releaseDateStart: Moment) => void,
  onSetReleaseDateEnd: (releaseDateEnd: Moment) => void,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      marginTop: theme.spacing(3),
    },
    '& > :first-child': {
      marginTop: 0,
    },
  },
}));

const MoviesFilters = (props: Props) => {
  const {
    allGenres,
    selectedFilters,
    onFiltersChanged,
    onSetSortBy,
    onToggleGenre,
    onSetReleaseDateStart,
    onSetReleaseDateEnd,
  } = props;

  const classes = useStyles();

  const handleSetSortBy = useCallback(
    (sortBy) => {
      onSetSortBy(sortBy);
      onFiltersChanged();
    },
    [onSetSortBy, onFiltersChanged],
  );

  const handleToggleGenre = useCallback(
    (genreId) => {
      onToggleGenre(genreId);
      onFiltersChanged();
    },
    [onToggleGenre, onFiltersChanged],
  );

  const handleSetReleaseDateStart = useCallback(
    (releaseDateStart) => {
      onSetReleaseDateStart(releaseDateStart);
      onFiltersChanged();
    },
    [onSetReleaseDateStart, onFiltersChanged],
  );

  const handleSetReleaseDateEnd = useCallback(
    (releaseDateEnd) => {
      onSetReleaseDateEnd(releaseDateEnd);
      onFiltersChanged();
    },
    [onSetReleaseDateEnd, onFiltersChanged],
  );

  return (
    <div className={classes.root}>
      <FilterBox title="Sort">
        <FilterBoxItem title="Sort by">
          <SortBySelect selectedValue={selectedFilters.sortBy} onChange={handleSetSortBy} />
        </FilterBoxItem>
      </FilterBox>
      <FilterBox title="Filters">
        <FilterBoxItem title="Release date">
          <DatePicker
            label="Start"
            selectedDate={selectedFilters.releaseDateStart}
            onDateChange={handleSetReleaseDateStart}
          />
          <DatePicker
            label="End"
            selectedDate={selectedFilters.releaseDateEnd}
            onDateChange={handleSetReleaseDateEnd}
          />
        </FilterBoxItem>
        <Divider light />
        <FilterBoxItem title="Genres">
          <ChipsList
            items={allGenres}
            selectedItems={selectedFilters.genres}
            onItemClick={handleToggleGenre}
          />
        </FilterBoxItem>
      </FilterBox>
    </div>
  );
};

export default MoviesFilters;
