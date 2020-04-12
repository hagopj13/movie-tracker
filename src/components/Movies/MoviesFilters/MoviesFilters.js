// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Divider from '@material-ui/core/Divider';

import FilterBox from 'components/UI/Filters/FilterBox/FilterBox';
import FilterBoxItem from 'components/UI/Filters/FilterBox/FilterBoxItem/FilterBoxItem';
import SortBySelect from './SortBySelect/SortBySelect';

type Props = {
  selectedSortBy: string,
  // selectedGenres: number[],
  // selectedReleaseYear: number,
  onSetSortBy: (string) => void,
  // onAddGenre: (number) => void,
  // onRemoveGenre: (number) => void,
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
    selectedSortBy,
    // selectedGenres,
    // selectedReleaseYear,
    onSetSortBy,
    // onAddGenre,
    // onRemoveGenre,
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
    </div>
  );
};

export default MoviesFilters;
