// @flow
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import DiscoverPage from 'pages/Discover/Discover';
import ProfilePage from 'pages/Profile/Profile';

import PrivateRoute from './PrivateRoute';

const AppRoutes = () => (
  <Switch>
    <Route exact path="/" component={DiscoverPage} />
    <PrivateRoute exact path="/profile" component={ProfilePage} />
  </Switch>
);

export default AppRoutes;
