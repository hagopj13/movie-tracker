// @flow
import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import Spinner from 'components/Spinner/Spinner';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import DiscoverMoviesPage from 'pages/DiscoverMovies/DiscoverMovies';

import PrivateRoute from './PrivateRoute';

const UpcomingMoviesPage = lazy(() => import('pages/UpcomingMovies/UpcomingMovies'));
const ProfilePage = lazy(() => import('pages/Profile/Profile'));
const SearchResultsPage = lazy(() => import('pages/SearchResults/SearchResults'));
const MovieDetailsPage = lazy(() => import('pages/MovieDetails/MovieDetails'));

const AppRoutes = () => (
  <Switch>
    <ErrorBoundary>
      <Suspense fallback={<Spinner />}>
        <Route exact path="/" component={DiscoverMoviesPage} />
        <Route exact path="/upcoming" component={UpcomingMoviesPage} />
        <PrivateRoute exact path="/profile" component={ProfilePage} />
        <Route path="/search" component={SearchResultsPage} />
        <Route path="/movies/:id" component={MovieDetailsPage} />
      </Suspense>
    </ErrorBoundary>
  </Switch>
);

export default AppRoutes;
