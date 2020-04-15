// @flow
import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import Spinner from 'components/Spinner/Spinner';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import DiscoverMoviesPage from 'pages/DiscoverMovies/DiscoverMovies';

import PrivateRoute from './PrivateRoute';

const ProfilePage = lazy(() => import('pages/Profile/Profile'));
const MoviePage = lazy(() => import('pages/Movie/Movie'));

const AppRoutes = () => (
  <Switch>
    <ErrorBoundary>
      <Suspense fallback={<Spinner />}>
        <Route exact path="/" component={DiscoverMoviesPage} />
        <PrivateRoute exact path="/profile" component={ProfilePage} />
        <Route path="/movies/:id" component={MoviePage} />
      </Suspense>
    </ErrorBoundary>
  </Switch>
);

export default AppRoutes;
