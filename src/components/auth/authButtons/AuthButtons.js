import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import LoginDialog from '../loginDialog/LoginDialog';
import { selectIsAuth } from '../../../store/auth/auth.selectors';

type Props = {
  isAuth: boolean,
};

const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: 'none',
    margin: theme.spacing(0, 0.5),
  },
}));

const AuthButtons = (props: Props) => {
  const { isAuth } = props;
  const classes = useStyles();
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  const handleLoginDialogOpen = () => setIsLoginDialogOpen(true);
  const handleLoginDialogClose = () => setIsLoginDialogOpen(false);

  return (
    <div>
      {isAuth ? (
        <Button variant="contained" className={classes.button}>
          Logout
        </Button>
      ) : (
        <Button
          variant="contained"
          className={classes.button}
          color="primary"
          onClick={handleLoginDialogOpen}
        >
          Login
        </Button>
      )}
      <LoginDialog isOpen={isLoginDialogOpen} onClose={handleLoginDialogClose} />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isAuth: selectIsAuth,
});

export default connect(mapStateToProps)(AuthButtons);
