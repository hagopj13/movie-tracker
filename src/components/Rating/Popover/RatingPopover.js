// @flow
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';

type Props = {
  isOpen: boolean,
  anchorEl: HTMLElement | null,
  initialValue: number,
  onClose: () => void,
  onChange: (newValue: number | null) => void,
};

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1.5),
    width: 165,
  },
}));

const RatingPopover = (props: Props) => {
  const { isOpen, anchorEl, initialValue, onClose, onChange } = props;

  const [value, setValue] = useState(initialValue);
  const [hover, setHover] = useState(-1);

  const classes = useStyles();

  const handleChange = (event, newValue: number | null) => {
    setValue(newValue);
    onChange(newValue);
  };

  const handleChangeActive = (event, newHover: number) => {
    setHover(newHover);
  };

  return (
    <Popover
      open={isOpen}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: -10, horizontal: 'center' }}
    >
      <div className={classes.content}>
        <Rating
          name="rating"
          value={value}
          precision={0.5}
          onChange={handleChange}
          onChangeActive={handleChangeActive}
        />
        <Box component="span" ml={1} fontSize={15}>
          {hover !== -1 ? hover : value}
        </Box>
      </div>
    </Popover>
  );
};

export default RatingPopover;
