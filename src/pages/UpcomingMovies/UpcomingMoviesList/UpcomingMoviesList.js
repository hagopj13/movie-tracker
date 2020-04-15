// @flow
import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import MoviesList from 'components/Movies/MoviesList/MoviesList';
import Spinner from 'components/Spinner/Spinner';
import upcomingActions from 'store/upcoming/upcoming.actions';
import upcomingSelectors from 'store/upcoming/upcoming.selectors';
import UpcomingActionTypes from 'store/upcoming/upcoming.types';
import loadingSelectors from 'store/api/loading/loading.selectors';
import type { MoviesResultsItem } from 'store/common/movies/movies.reducer';

type Props = {
  moviesResults: MoviesResultsItem[],
  isLoading: boolean,
  isLoadingMore: boolean,
  onFetchMoreMovies: () => void,
};

const UpcomingMoviesList = (props: Props) => {
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
  moviesResults: upcomingSelectors.selectResults,
  isLoading: loadingSelectors.createIsLoadingSelector([UpcomingActionTypes.FETCH_MOVIES]),
  isLoadingMore: loadingSelectors.createIsLoadingSelector([UpcomingActionTypes.FETCH_MORE_MOVIES]),
});

const mapDispatchToProps = {
  onFetchMoreMovies: upcomingActions.fetchMoreMovies,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpcomingMoviesList);
