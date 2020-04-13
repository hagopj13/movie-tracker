// @flow
import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import MoviesList from 'components/Movies/MoviesList/MoviesList';
import Spinner from 'components/UI/Spinner/Spinner';
import discoverActions from 'store/discover/discover.actions';
import discoverSelectors from 'store/discover/discover.selectors';
import DiscoverActionTypes from 'store/discover/discover.types';
import { createIsLoadingSelector } from 'store/api/loading/loading.selectors';

type Props = {
  moviesResults: any[],
  isLoading: boolean,
  isLoadingMore: boolean,
  onFetchMoreMovies: () => void,
};

const DiscoverMoviesList = (props: Props) => {
  const { moviesResults, isLoading, isLoadingMore, onFetchMoreMovies } = props;

  const handleLoadMore = useCallback(() => {
    onFetchMoreMovies();
  }, [onFetchMoreMovies]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <MoviesList moviesList={moviesResults} onLoadMore={handleLoadMore} />
      {isLoadingMore && <Spinner />}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  moviesResults: discoverSelectors.selectResults,
  isLoading: createIsLoadingSelector([DiscoverActionTypes.FETCH_MOVIES]),
  isLoadingMore: createIsLoadingSelector([DiscoverActionTypes.FETCH_MORE_MOVIES]),
});

const mapDispatchToProps = {
  onFetchMoreMovies: discoverActions.fetchMoreMovies,
};

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverMoviesList);
