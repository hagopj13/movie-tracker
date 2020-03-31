// @flow
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import DialogTypes from 'components/UI/Dialog/types';
import { selectIsAuth } from 'store/auth/auth.selectors';
import { logout } from 'store/auth/auth.actions';
import AuthActionTypes from 'store/auth/auth.types';
import { createIsLoadingSelector } from 'store/api/loading/loading.selectors';
import { showDialog } from 'store/ui/dialog/dialog.actions';

type Props = {
  isAuth: boolean,
  isLogoutLoading: boolean,
  onLogout: () => void,
  onShowLoginDialog: () => void,
};

const useStyles = makeStyles((theme) => ({
  root: {
    textTransform: 'none',
    margin: theme.spacing(0, 0.5),
    '&$disabled': {
      backgroundColor: theme.palette.grey[300],
    },
  },
  disabled: {},
}));

const AuthButtons = (props: Props) => {
  const { isAuth, isLogoutLoading, onLogout, onShowLoginDialog } = props;
  const classes = useStyles();

  return (
    <div>
      {isAuth ? (
        <Button
          variant="contained"
          disabled={isLogoutLoading}
          classes={{ root: classes.root, disabled: classes.disabled }}
          onClick={onLogout}
        >
          Logout
        </Button>
      ) : (
        <Button
          variant="contained"
          className={classes.root}
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
  isLogoutLoading: createIsLoadingSelector([AuthActionTypes.LOGOUT]),
});

const mapDispatchToProps = {
  onLogout: logout,
  onShowLoginDialog: () => showDialog(DialogTypes.LOGIN),
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthButtons);
