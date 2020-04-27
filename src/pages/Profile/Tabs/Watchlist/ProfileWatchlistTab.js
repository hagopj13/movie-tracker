// @flow
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import watchlistActions from 'store/user/watchlist/watchlist.actions';
import watchlistSelectors from 'store/user/watchlist/watchlist.selectors';
import WatchlistActionTypes from 'store/user/watchlist/watchlist.types';
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

const ProfileWatchlistTab = (props: Props) => {
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
  moviesList: watchlistSelectors.selectList,
  isLoading: loadingSelectors.createIsLoadingSelector([WatchlistActionTypes.FETCH_MOVIES]),
  isLoadingMore: loadingSelectors.createIsLoadingSelector([WatchlistActionTypes.FETCH_MORE_MOVIES]),
});

const mapDispatchToProps = {
  onFetchMovies: watchlistActions.fetchMovies,
  onFetchMoreMovies: watchlistActions.fetchMoreMovies,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileWatchlistTab);
