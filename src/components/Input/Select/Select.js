// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MuiSelect from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

type Props = {
  options: Array<{ value: string, label: string }>,
  selectedValue: string,
  onValueChange: (value: string) => void,
};

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

const Select = (props: Props) => {
  const { options, selectedValue, onValueChange } = props;

  const classes = useStyles();

  const handleValueChange = (event) => {
    onValueChange(event.target.value);
  };

  return (
    <MuiSelect
      className={classes.root}
      value={selectedValue}
      onChange={handleValueChange}
      variant="outlined"
      margin="dense"
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </MuiSelect>
  );
};

export default Select;
