import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import LoginDialog from '../loginDialog/LoginDialog';

const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: 'none',
    margin: theme.spacing(0, 0.5),
  },
}));

const AuthButtons = () => {
  const classes = useStyles();
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

  const handleLoginDialogOpen = () => setLoginDialogOpen(true);
  const handleLoginDialogClose = () => setLoginDialogOpen(false);

  return (
    <div>
      <Button
        variant="contained"
        className={classes.button}
        color="primary"
        onClick={handleLoginDialogOpen}
      >
        Login
      </Button>
      <Button variant="contained" className={classes.button}>
        Logout
      </Button>
      <LoginDialog open={loginDialogOpen} onClose={handleLoginDialogClose} />
    </div>
  );
};

export default AuthButtons;
