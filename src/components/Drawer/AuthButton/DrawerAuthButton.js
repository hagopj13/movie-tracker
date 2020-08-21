// @flow
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LogoutIcon from '@material-ui/icons/Lock';
import LoginIcon from '@material-ui/icons/LockOpen';

import dialogTypes from 'config/dialogTypes';
import authSelectors from 'store/auth/auth.selectors';
import authActions from 'store/auth/auth.actions';
import dialogActions from 'store/ui/dialog/dialog.actions';

type Props = {
  isAuth: boolean,
  onLogout: () => void,
  onShowLoginDialog: () => void,
};

export const DrawerAuthButton = (props: Props) => {
  const { isAuth, onLogout, onShowLoginDialog } = props;

  return (
    <List>
      {isAuth ? (
        <ListItem button onClick={onLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      ) : (
        <ListItem button onClick={onShowLoginDialog}>
          <ListItemIcon>
            <LoginIcon />
          </ListItemIcon>
          <ListItemText primary="Login" />
        </ListItem>
      )}
    </List>
  );
};

const mapStateToProps = createStructuredSelector({
  isAuth: authSelectors.selectIsAuth,
});

const mapDispatchToProps = {
  onLogout: authActions.logout,
  onShowLoginDialog: () => dialogActions.showDialog(dialogTypes.LOGIN),
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerAuthButton);
