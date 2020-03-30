// @flow
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import DialogTypes from 'components/UI/Dialog/types';
import { selectIsAuth } from 'store/auth/auth.selectors';
import { showDialog } from 'store/ui/dialog/dialog.actions';

type Props = {
  isAuth: boolean,
  onShowLoginDialog: () => void,
};

const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: 'none',
    margin: theme.spacing(0, 0.5),
  },
}));

const AuthButtons = (props: Props) => {
  const { isAuth, onShowLoginDialog } = props;
  const classes = useStyles();

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
          onClick={onShowLoginDialog}
        >
          Login
        </Button>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isAuth: selectIsAuth,
});

const mapDispatchToProps = {
  onShowLoginDialog: () => showDialog(DialogTypes.LOGIN),
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthButtons);
