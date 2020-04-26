// @flow
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import DialogTypes from 'components/Dialog/types';
import authSelectors from 'store/auth/auth.selectors';
import authActions from 'store/auth/auth.actions';
import AuthActionTypes from 'store/auth/auth.types';
import loadingSelectors from 'store/api/loading/loading.selectors';
import dialogActions from 'store/ui/dialog/dialog.actions';

type Props = {
  isAuth: boolean,
  isLogoutLoading: boolean,
  onLogout: () => void,
  onShowLoginDialog: () => void,
};

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 72,
    textTransform: 'none',
    fontSize: theme.typography.h6.fontSize,
    fontWeight: theme.typography.fontWeightRegular,
    '&$disabled': {
      color: theme.palette.grey[300],
    },
  },
  disabled: {},
  logout: {
    color: theme.palette.common.white,
  },
}));

const AuthButton = (props: Props) => {
  const { isAuth, isLogoutLoading, onLogout, onShowLoginDialog } = props;
  const classes = useStyles();

  return (
    <>
      {isAuth ? (
        <Button
          classes={{ root: classes.root, disabled: classes.disabled, text: classes.logout }}
          disabled={isLogoutLoading}
          onClick={onLogout}
        >
          Logout
        </Button>
      ) : (
        <Button className={classes.root} color="primary" onClick={onShowLoginDialog}>
          Login
        </Button>
      )}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  isAuth: authSelectors.selectIsAuth,
  isLogoutLoading: loadingSelectors.createIsLoadingSelector([AuthActionTypes.LOGOUT]),
});

const mapDispatchToProps = {
  onLogout: authActions.logout,
  onShowLoginDialog: () => dialogActions.showDialog(DialogTypes.LOGIN),
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthButton);
