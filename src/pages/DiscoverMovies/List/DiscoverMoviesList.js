// @flow
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import MovieList from 'components/Movie/List/MovieList';
import Spinner from 'components/Spinner/Spinner';
import discoverActions from 'store/discover/discover.actions';
import discoverSelectors from 'store/discover/discover.selectors';
import DiscoverActionTypes from 'store/discover/discover.types';
import loadingSelectors from 'store/api/loading/loading.selectors';
import type { Movie } from 'types';

type Props = {
  movies: Movie[],
  isLoading: boolean,
  isLoadingMore: boolean,
  onFetchMoreMovies: () => void,
};

export const DiscoverMoviesList = (props: Props) => {
  const { movies, isLoading, isLoadingMore, onFetchMoreMovies } = props;

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <MovieList movies={movies} onLoadMore={onFetchMoreMovies} />
      {isLoadingMore && <Spinner />}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  movies: discoverSelectors.selectList,
  isLoading: loadingSelectors.createIsLoadingSelector([DiscoverActionTypes.FETCH_MOVIES]),
  isLoadingMore: loadingSelectors.createIsLoadingSelector([DiscoverActionTypes.FETCH_MORE_MOVIES]),
});

const mapDispatchToProps = {
  onFetchMoreMovies: discoverActions.fetchMoreMovies,
};

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverMoviesList);
