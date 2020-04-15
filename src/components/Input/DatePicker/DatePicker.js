// @flow
import React, { useCallback } from 'react';
import type { Moment } from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

type Props = {
  label: string,
  selectedDate: Moment,
  onDateChange: (date: Moment) => void,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginLeft: theme.spacing(0.5),
  },
  label: {
    minWidth: 38,
    width: 38,
    fontWeight: 300,
    marginTop: 15,
  },
  icon: {
    padding: 0,
  },
}));

const DatePicker = (props: Props) => {
  const { label, selectedDate, onDateChange } = props;

  const classes = useStyles();

  const handleDateChange = useCallback(
    (date: Moment) => {
      if (date !== selectedDate && !date?.isSame(selectedDate)) {
        onDateChange(date);
      }
    },
    [onDateChange, selectedDate],
  );

  return (
    <div className={classes.root}>
      {label && <Typography className={classes.label}>{label}</Typography>}
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          inputVariant="outlined"
          format="DD/MM/YYYY"
          margin="dense"
          color="primary"
          value={selectedDate}
          onChange={handleDateChange}
          InputProps={{
            endAdornment: (
              <IconButton className={classes.icon} onClick={() => handleDateChange(null)}>
                <ClearIcon />
              </IconButton>
            ),
          }}
          InputAdornmentProps={{
            position: 'start',
          }}
          KeyboardButtonProps={{
            className: classes.icon,
          }}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default DatePicker;
