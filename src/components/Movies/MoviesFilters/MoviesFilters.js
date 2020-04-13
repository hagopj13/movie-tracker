// @flow
import React, { useCallback } from 'react';
import type { Moment } from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

import FilterBox from 'components/UI/Filters/FilterBox/FilterBox';
import FilterBoxItem from 'components/UI/Filters/FilterBox/FilterBoxItem/FilterBoxItem';
import ChipsList from 'components/UI/ChipsList/ChipsList';
import DatePicker from 'components/UI/Input/DatePicker/DatePicker';
import SortBySelect from './SortBySelect/SortBySelect';

type Props = {
  allGenres: Array<{ id: number, name: string }>,
  selectedSortBy: string,
  selectedGenres: number[],
  selectedReleaseDateStart: Moment,
  selectedReleaseDateEnd: Moment,
  onFiltersChanged: () => void,
  onSetSortBy: (sortBy: string) => void,
  onToggleGenre: (genre: number) => void,
  onSetReleaseDateStart: (date: Moment) => void,
  onSetReleaseDateEnd: (date: Moment) => void,
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
    selectedSortBy,
    selectedGenres,
    selectedReleaseDateStart,
    selectedReleaseDateEnd,
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
    (genre) => {
      onToggleGenre(genre);
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
          <SortBySelect selectedValue={selectedSortBy} onChange={handleSetSortBy} />
        </FilterBoxItem>
      </FilterBox>
      <FilterBox title="Filters">
        <FilterBoxItem title="Release date">
          <DatePicker
            label="Start"
            selectedDate={selectedReleaseDateStart}
            onDateChange={handleSetReleaseDateStart}
          />
          <DatePicker
            label="End"
            selectedDate={selectedReleaseDateEnd}
            onDateChange={handleSetReleaseDateEnd}
          />
        </FilterBoxItem>
        <Divider light />
        <FilterBoxItem title="Genres">
          <ChipsList
            items={allGenres}
            selectedItems={selectedGenres}
            onItemClick={handleToggleGenre}
          />
        </FilterBoxItem>
      </FilterBox>
    </div>
  );
};

export default MoviesFilters;
