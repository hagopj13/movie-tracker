// @flow
import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import MoviesList from 'components/Movies/List/MoviesList';
import Spinner from 'components/Spinner/Spinner';
import discoverActions from 'store/discover/discover.actions';
import discoverSelectors from 'store/discover/discover.selectors';
import DiscoverActionTypes from 'store/discover/discover.types';
import loadingSelectors from 'store/api/loading/loading.selectors';
import type { MoviesListItem } from 'store/common/movies/movies.reducer';

type Props = {
  moviesList: MoviesListItem[],
  isLoading: boolean,
  isLoadingMore: boolean,
  onFetchMoreMovies: () => void,
};

const DiscoverMoviesList = (props: Props) => {
  const { moviesList, isLoading, isLoadingMore, onFetchMoreMovies } = props;

  const handleLoadMore = useCallback(() => {
    onFetchMoreMovies();
  }, [onFetchMoreMovies]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <MoviesList moviesList={moviesList} onLoadMore={handleLoadMore} />
      {isLoadingMore && <Spinner />}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  moviesList: discoverSelectors.selectList,
  isLoading: loadingSelectors.createIsLoadingSelector([DiscoverActionTypes.FETCH_MOVIES]),
  isLoadingMore: loadingSelectors.createIsLoadingSelector([DiscoverActionTypes.FETCH_MORE_MOVIES]),
});

const mapDispatchToProps = {
  onFetchMoreMovies: discoverActions.fetchMoreMovies,
};

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverMoviesList);
