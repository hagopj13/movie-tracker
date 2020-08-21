// @flow
import React from 'react';
import type { Moment } from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

import FilterBox from 'components/Filter/Box/FilterBox';
import FilterBoxItem from 'components/Filter/Box/Item/FilterBoxItem';
import Select from 'components/Input/Select/Select';
import ChipList from 'components/Input/ChipList/ChipList';
import DatePicker from 'components/Input/DatePicker/DatePicker';
import sortOptions from 'config/sortOptions';
import type { State as FiltersState } from 'store/common/filters/filters.reducer';
import type { Genre } from 'types';

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

const MovieFilters = (props: Props) => {
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

  const handleSetSortBy = (sortBy) => {
    onSetSortBy(sortBy);
    onFiltersChanged();
  };

  const handleToggleGenre = (genreId) => {
    onToggleGenre(genreId);
    onFiltersChanged();
  };

  const handleSetReleaseDateStart = (releaseDateStart) => {
    onSetReleaseDateStart(releaseDateStart);
    onFiltersChanged();
  };

  const handleSetReleaseDateEnd = (releaseDateEnd) => {
    onSetReleaseDateEnd(releaseDateEnd);
    onFiltersChanged();
  };

  return (
    <div className={classes.root}>
      <FilterBox title="Sort">
        <FilterBoxItem title="Sort by">
          <Select
            options={sortOptions}
            selectedValue={selectedFilters.sortBy}
            onValueChange={handleSetSortBy}
          />
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
          <ChipList
            items={allGenres}
            selectedItems={selectedFilters.genres}
            onItemClick={handleToggleGenre}
          />
        </FilterBoxItem>
      </FilterBox>
    </div>
  );
};

export default MovieFilters;
