// @flow
import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import MoviesList from 'components/Movies/List/MoviesList';
import Spinner from 'components/Spinner/Spinner';
import upcomingActions from 'store/upcoming/upcoming.actions';
import upcomingSelectors from 'store/upcoming/upcoming.selectors';
import UpcomingActionTypes from 'store/upcoming/upcoming.types';
import loadingSelectors from 'store/api/loading/loading.selectors';
import type { MoviesListItem } from 'types';

type Props = {
  moviesList: MoviesListItem[],
  isLoading: boolean,
  isLoadingMore: boolean,
  onFetchMoreMovies: () => void,
};

const UpcomingMoviesList = (props: Props) => {
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
  moviesList: upcomingSelectors.selectList,
  isLoading: loadingSelectors.createIsLoadingSelector([UpcomingActionTypes.FETCH_MOVIES]),
  isLoadingMore: loadingSelectors.createIsLoadingSelector([UpcomingActionTypes.FETCH_MORE_MOVIES]),
});

const mapDispatchToProps = {
  onFetchMoreMovies: upcomingActions.fetchMoreMovies,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpcomingMoviesList);
