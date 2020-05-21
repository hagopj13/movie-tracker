// @flow
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import watchlistActions from 'store/user/watchlist/watchlist.actions';
import watchlistSelectors from 'store/user/watchlist/watchlist.selectors';
import WatchlistActionTypes from 'store/user/watchlist/watchlist.types';
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

export const ProfileWatchlistTab = (props: Props) => {
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
  movies: watchlistSelectors.selectList,
  isLoading: loadingSelectors.createIsLoadingSelector([WatchlistActionTypes.FETCH_MOVIES]),
  isLoadingMore: loadingSelectors.createIsLoadingSelector([WatchlistActionTypes.FETCH_MORE_MOVIES]),
});

const mapDispatchToProps = {
  onFetchMovies: watchlistActions.fetchMovies,
  onFetchMoreMovies: watchlistActions.fetchMoreMovies,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileWatchlistTab);
