import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import LoginDialog from '../loginDialog/LoginDialog';

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
  const [logInOpen, setLogInOpen] = useState(false);

  const handleLoginOpen = () => setLogInOpen(true);
  const handleLoginClose = () => setLogInOpen(false);

  return (
    <div className={classes.root}>
      <Button variant="contained" color="primary" onClick={handleLoginOpen}>
        Login
      </Button>
      <Button variant="contained">Logout</Button>
      <LoginDialog open={logInOpen} onClose={handleLoginClose} />
    </div>
  );
};

export default AuthButtons;
