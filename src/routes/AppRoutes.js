// @flow
import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import Spinner from 'components/UI/Spinner/Spinner';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import DiscoverPage from 'pages/Discover/Discover';

import PrivateRoute from './PrivateRoute';

const ProfilePage = lazy(() => import('pages/Profile/Profile'));

const AppRoutes = () => (
  <Switch>
    <ErrorBoundary>
      <Suspense fallback={<Spinner />}>
        <Route exact path="/" component={DiscoverPage} />
        <PrivateRoute exact path="/profile" component={ProfilePage} />
      </Suspense>
    </ErrorBoundary>
  </Switch>
);

export default AppRoutes;
