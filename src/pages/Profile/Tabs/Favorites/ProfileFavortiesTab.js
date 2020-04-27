// @flow
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import favoritesActions from 'store/user/favorites/favorites.actions';
import favoritesSelectors from 'store/user/favorites/favorites.selectors';
import FavoritesActionTypes from 'store/user/favorites/favorites.types';
import loadingSelectors from 'store/api/loading/loading.selectors';
import type { MoviesListItem } from 'types';

import ProfileMoviesList from '../../MoviesList/ProfileMoviesList';

type Props = {
  moviesList: MoviesListItem[],
  isLoading: boolean,
  isLoadingMore: boolean,
  onFetchMovies: () => void,
  onFetchMoreMovies: () => void,
};

const ProfileFavoritesTab = (props: Props) => {
  const { moviesList, isLoading, isLoadingMore, onFetchMovies, onFetchMoreMovies } = props;

  return (
    <ProfileMoviesList
      moviesList={moviesList}
      isLoading={isLoading}
      isLoadingMore={isLoadingMore}
      onFetchMovies={onFetchMovies}
      onFetchMoreMovies={onFetchMoreMovies}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  moviesList: favoritesSelectors.selectList,
  isLoading: loadingSelectors.createIsLoadingSelector([FavoritesActionTypes.FETCH_MOVIES]),
  isLoadingMore: loadingSelectors.createIsLoadingSelector([FavoritesActionTypes.FETCH_MORE_MOVIES]),
});

const mapDispatchToProps = {
  onFetchMovies: favoritesActions.fetchMovies,
  onFetchMoreMovies: favoritesActions.fetchMoreMovies,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileFavoritesTab);
