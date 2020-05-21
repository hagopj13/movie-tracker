// @flow
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import favoritesActions from 'store/user/favorites/favorites.actions';
import favoritesSelectors from 'store/user/favorites/favorites.selectors';
import FavoritesActionTypes from 'store/user/favorites/favorites.types';
import loadingSelectors from 'store/api/loading/loading.selectors';
import type { Movie } from 'types';

import ProfileMovieList from '../../MovieList/ProfileMovieList';

type Props = {
  movies: Movie[],
  isLoading: boolean,
  isLoadingMore: boolean,
  onFetchMovies: () => void,
  onFetchMoreMovies: () => void,
};

export const ProfileFavoritesTab = (props: Props) => {
  const { movies, isLoading, isLoadingMore, onFetchMovies, onFetchMoreMovies } = props;

  return (
    <ProfileMovieList
      movies={movies}
      isLoading={isLoading}
      isLoadingMore={isLoadingMore}
      onFetchMovies={onFetchMovies}
      onFetchMoreMovies={onFetchMoreMovies}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  movies: favoritesSelectors.selectList,
  isLoading: loadingSelectors.createIsLoadingSelector([FavoritesActionTypes.FETCH_MOVIES]),
  isLoadingMore: loadingSelectors.createIsLoadingSelector([FavoritesActionTypes.FETCH_MORE_MOVIES]),
});

const mapDispatchToProps = {
  onFetchMovies: favoritesActions.fetchMovies,
  onFetchMoreMovies: favoritesActions.fetchMoreMovies,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileFavoritesTab);
