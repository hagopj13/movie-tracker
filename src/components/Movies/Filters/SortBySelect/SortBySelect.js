// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

type Props = {
  selectedValue: string,
  onChange: (value: string) => void,
};

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

const options = [
  { value: 'popularity.asc', label: 'Popularity Ascending' },
  { value: 'popularity.desc', label: 'Popularity Descending' },
  { value: 'vote_average.asc', label: 'Rating Ascending' },
  { value: 'vote_average.desc', label: 'Rating Descending' },
  { value: 'release_date.asc', label: 'Release Date Ascending' },
  { value: 'release_date.desc', label: 'Release Date Descending' },
];

const SortBySelect = (props: Props) => {
  const { selectedValue, onChange } = props;

  const classes = useStyles();

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <Select
      className={classes.root}
      value={selectedValue}
      onChange={handleChange}
      variant="outlined"
      margin="dense"
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SortBySelect;
