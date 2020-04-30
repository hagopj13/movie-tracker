// @flow
import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import Spinner from 'components/Spinner/Spinner';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import DiscoverMoviesPage from 'pages/DiscoverMovies/DiscoverMovies';
import ErrorPage from 'pages/ErrorPage/ErrorPage';

import PrivateRoute from './PrivateRoute';

const UpcomingMoviesPage = lazy(() => import('pages/UpcomingMovies/UpcomingMovies'));
const ProfilePage = lazy(() => import('pages/Profile/Profile'));
const SearchResultsPage = lazy(() => import('pages/SearchResults/SearchResults'));
const MovieOverviewPage = lazy(() => import('pages/MovieOverview/MovieOverview'));
const NotFoundPage = () => <ErrorPage errorText="Page not found" />;

const AppRoutes = () => (
  <ErrorBoundary>
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route exact path="/" component={DiscoverMoviesPage} />
        <Route exact path="/upcoming" component={UpcomingMoviesPage} />
        <PrivateRoute exact path="/profile" component={ProfilePage} />
        <Route path="/search" component={SearchResultsPage} />
        <Route path="/movies/:id" component={MovieOverviewPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Suspense>
  </ErrorBoundary>
);

export default AppRoutes;
