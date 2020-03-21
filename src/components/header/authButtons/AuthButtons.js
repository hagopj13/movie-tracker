import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      textTransform: 'none',
      margin: theme.spacing(0.5),
    },
  },
}));

const AuthButtons = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button variant="contained">Signup</Button>
      <Button variant="contained" color="primary">
        Login
      </Button>
      <Button variant="contained">Logout</Button>
    </div>
  );
};

export default AuthButtons;
