// @flow
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core';
import 'normalize.css/normalize.css';

import Header from 'components/Header/Header';
import DialogRoot from 'components/UI/Dialog/Root/DialogRoot';
import AppRoutes from 'routes/AppRoutes';
import { checkAuthState } from 'store/auth/auth.actions';
import { getConfig } from 'store/config/config.actions';
import theme from 'styles/muiTheme';
import 'styles/global.scss';

type Props = {
  onCheckAuthState: () => void,
  onGetConfig: () => void,
};

const App = (props: Props) => {
  const { onCheckAuthState, onGetConfig } = props;

  useEffect(() => {
    onCheckAuthState();
    onGetConfig();
  }, [onCheckAuthState, onGetConfig]);

  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <Header />
        <DialogRoot />
        <AppRoutes />
      </MuiThemeProvider>
    </div>
  );
};

const mapDispatchToProps = {
  onCheckAuthState: checkAuthState,
  onGetConfig: getConfig,
};

export default connect(null, mapDispatchToProps)(App);
