// @flow
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core';
import 'normalize.css/normalize.css';

import Header from 'components/Header/Header';
import DialogRoot from 'components/Dialog/Root/DialogRoot';
import AppRoutes from 'routes/AppRoutes';
import authActions from 'store/auth/auth.actions';
import configActions from 'store/config/config.actions';
import theme from 'styles/muiTheme';
import 'styles/global.scss';

type Props = {
  onCheckAuthState: () => void,
  onGetImagesConfig: () => void,
};

const App = (props: Props) => {
  const { onCheckAuthState, onGetImagesConfig } = props;

  useEffect(() => {
    onCheckAuthState();
    onGetImagesConfig();
  }, [onCheckAuthState, onGetImagesConfig]);

  return (
    <>
      <MuiThemeProvider theme={theme}>
        <Header />
        <DialogRoot />
        <AppRoutes />
      </MuiThemeProvider>
    </>
  );
};

const mapDispatchToProps = {
  onCheckAuthState: authActions.checkAuthState,
  onGetImagesConfig: configActions.getImagesConfig,
};

export default connect(null, mapDispatchToProps)(App);
