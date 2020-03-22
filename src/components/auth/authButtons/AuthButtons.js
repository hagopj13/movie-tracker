import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import SignInDialog from '../signInDialog/SignInDialog';
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
  const [signInOpen, setSignInOpen] = useState(false);

  const handleSignUpOpen = () => setSignUpOpen(true);
  const handleSignUpClose = () => setSignUpOpen(false);
  const handleSignInOpen = () => setSignInOpen(true);
  const handleSignInClose = () => setSignInOpen(false);

  return (
    <div className={classes.root}>
      <Button variant="contained" onClick={handleSignUpOpen}>
        Sign Up
      </Button>
      <Button variant="contained" color="primary" onClick={handleSignInOpen}>
        Sign In
      </Button>
      <Button variant="contained">Sign Out</Button>
      <SignUpDialog open={signUpOpen} onClose={handleSignUpClose} />
      <SignInDialog open={signInOpen} onClose={handleSignInClose} />
    </div>
  );
};

export default AuthButtons;
