import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import LoginDialog from '../loginDialog/LoginDialog';
import SignUpDialog from '../signUpDialog/SignUpDialog';

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
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [logInOpen, setLogInOpen] = useState(false);

  const handleSignUpOpen = () => setSignUpOpen(true);
  const handleSignUpClose = () => setSignUpOpen(false);
  const handleLoginOpen = () => setLogInOpen(true);
  const handleLoginClose = () => setLogInOpen(false);

  return (
    <div className={classes.root}>
      <Button variant="contained" onClick={handleSignUpOpen}>
        Sign Up
      </Button>
      <Button variant="contained" color="primary" onClick={handleLoginOpen}>
        Login
      </Button>
      <Button variant="contained">Logout</Button>
      <SignUpDialog open={signUpOpen} onClose={handleSignUpClose} />
      <LoginDialog open={logInOpen} onClose={handleLoginClose} />
    </div>
  );
};

export default AuthButtons;
