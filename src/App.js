import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';
import 'normalize.css/normalize.css';

import Header from './components/header/Header';
import HomePage from './pages/homepage/HomePage';
import theme from './styles/muiTheme';
import './styles/global.scss';

const App = () => (
  <div>
    <MuiThemeProvider theme={theme}>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </MuiThemeProvider>
  </div>
);

export default App;
