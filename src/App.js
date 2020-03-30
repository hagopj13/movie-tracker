import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';
import 'normalize.css/normalize.css';

import Header from 'components/Header/Header';
import DialogRoot from 'components/UI/Dialog/Root/DialogRoot';
import DiscoverPage from 'pages/Discover/Discover';
import theme from 'styles/muiTheme';
import 'styles/global.scss';

const App = () => (
  <div>
    <MuiThemeProvider theme={theme}>
      <Header />
      <DialogRoot />
      <Switch>
        <Route exact path="/" component={DiscoverPage} />
      </Switch>
    </MuiThemeProvider>
  </div>
);

export default App;
