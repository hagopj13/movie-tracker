// @flow
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { MuiThemeProvider } from '@material-ui/core';
import 'normalize.css/normalize.css';

import Header from 'components/Header/Header';
import DialogRoot from 'components/Dialog/Root/DialogRoot';
import Spinner from 'components/Spinner/Spinner';
import AppRoutes from 'routes/AppRoutes';
import authActions from 'store/auth/auth.actions';
import authSelectors from 'store/auth/auth.selectors';
import configActions from 'store/config/config.actions';
import theme from 'styles/muiTheme';
import 'styles/global.scss';

type Props = {
  isAuthLoading: boolean,
  onCheckAuthState: () => void,
  onFetchImagesConfig: () => void,
};

const App = (props: Props) => {
  const { isAuthLoading, onCheckAuthState, onFetchImagesConfig } = props;

  useEffect(() => {
    onCheckAuthState();
    onFetchImagesConfig();
  }, [onCheckAuthState, onFetchImagesConfig]);

  const renderApp = () => {
    if (isAuthLoading) {
      return <Spinner />;
    }
    return (
      <>
        <Header />
        <DialogRoot />
        <AppRoutes />
      </>
    );
  };

  return <MuiThemeProvider theme={theme}>{renderApp()}</MuiThemeProvider>;
};

const mapStateToProps = createStructuredSelector({
  isAuthLoading: authSelectors.selectIsLoading,
});

const mapDispatchToProps = {
  onCheckAuthState: authActions.checkAuthState,
  onFetchImagesConfig: configActions.fetchImagesConfig,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
