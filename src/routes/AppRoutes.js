// @flow
import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import Spinner from 'components/UI/Spinner/Spinner';
import DiscoverPage from 'pages/Discover/Discover';

import PrivateRoute from './PrivateRoute';

const ProfilePage = lazy(() => import('pages/Profile/Profile'));

const AppRoutes = () => (
  <Switch>
    <Suspense fallback={<Spinner />}>
      <Route exact path="/" component={DiscoverPage} />
      <PrivateRoute exact path="/profile" component={ProfilePage} />
    </Suspense>
  </Switch>
);

export default AppRoutes;
