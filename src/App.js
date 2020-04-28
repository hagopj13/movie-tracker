// @flow
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { MuiThemeProvider } from '@material-ui/core';
import 'normalize.css/normalize.css';

import Layout from 'components/Layout/Layout';
import Spinner from 'components/Spinner/Spinner';
import AppRoutes from 'routes/AppRoutes';
import authActions from 'store/auth/auth.actions';
import AuthActionTypes from 'store/auth/auth.types';
import loadedSelectors from 'store/api/loaded/loaded.selectors';
import configActions from 'store/config/config.actions';
import theme from 'styles/muiTheme';
import 'styles/global.scss';

type Props = {
  isLogoutLoaded: boolean,
  isLoginLoaded: boolean,
  onCheckAuthState: () => void,
  onFetchImagesConfig: () => void,
};

const App = (props: Props) => {
  const { isLogoutLoaded, isLoginLoaded, onCheckAuthState, onFetchImagesConfig } = props;

  useEffect(() => {
    onCheckAuthState();
    onFetchImagesConfig();
  }, [onCheckAuthState, onFetchImagesConfig]);

  const isAuthLoaded = isLogoutLoaded || isLoginLoaded;

  return (
    <MuiThemeProvider theme={theme}>
      {!isAuthLoaded ? (
        <Spinner />
      ) : (
        <Layout>
          <AppRoutes />
        </Layout>
      )}
    </MuiThemeProvider>
  );
};

const mapStateToProps = createStructuredSelector({
  isLogoutLoaded: loadedSelectors.createIsLoadedSelector([AuthActionTypes.LOGOUT]),
  isLoginLoaded: loadedSelectors.createIsLoadedSelector([AuthActionTypes.LOGIN]),
});

const mapDispatchToProps = {
  onCheckAuthState: authActions.checkAuthState,
  onFetchImagesConfig: configActions.fetchImagesConfig,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
