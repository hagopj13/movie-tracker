// @flow
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core';
import 'normalize.css/normalize.css';

import Header from 'components/Header/Header';
import DialogRoot from 'components/UI/Dialog/Root/DialogRoot';
import AppRoutes from 'routes/AppRoutes';
import { checkAuthState } from 'store/auth/auth.actions';
import theme from 'styles/muiTheme';
import 'styles/global.scss';

type Props = {
  onCheckAuthState: () => void,
};

const App = (props: Props) => {
  const { onCheckAuthState } = props;

  useEffect(() => {
    onCheckAuthState();
  }, [onCheckAuthState]);

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
};

export default connect(null, mapDispatchToProps)(App);
