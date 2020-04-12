// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Divider from '@material-ui/core/Divider';

import FilterBox from 'components/UI/Filters/FilterBox/FilterBox';
import FilterBoxItem from 'components/UI/Filters/FilterBox/FilterBoxItem/FilterBoxItem';
import ChipsList from 'components/UI/ChipsList/ChipsList';
import SortBySelect from './SortBySelect/SortBySelect';

type Props = {
  allGenres: Array<{ id: number, name: string }>,
  selectedSortBy: string,
  selectedGenres: number[],
  // selectedReleaseYear: number,
  onSetSortBy: (string) => void,
  onToggleGenre: (number) => void,
  // onSetReleaseYear: (number) => void,
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
    // selectedReleaseYear,
    onSetSortBy,
    onToggleGenre,
    // onSetReleaseYear,
  } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FilterBox title="Sort">
        <FilterBoxItem title="Sort by">
          <SortBySelect selectedValue={selectedSortBy} onChange={onSetSortBy} />
        </FilterBoxItem>
      </FilterBox>
      <FilterBox title="Filters">
        <FilterBoxItem title="Genres">
          <ChipsList items={allGenres} selectedItems={selectedGenres} onItemClick={onToggleGenre} />
        </FilterBoxItem>
      </FilterBox>
    </div>
  );
};

export default MoviesFilters;
