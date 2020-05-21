// @flow
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import MovieList from 'components/Movie/List/MovieList';
import Spinner from 'components/Spinner/Spinner';
import upcomingActions from 'store/upcoming/upcoming.actions';
import upcomingSelectors from 'store/upcoming/upcoming.selectors';
import UpcomingActionTypes from 'store/upcoming/upcoming.types';
import loadingSelectors from 'store/api/loading/loading.selectors';
import type { Movie } from 'types';

type Props = {
  movies: Movie[],
  isLoading: boolean,
  isLoadingMore: boolean,
  onFetchMoreMovies: () => void,
};

export const UpcomingMoviesList = (props: Props) => {
  const { movies, isLoading, isLoadingMore, onFetchMoreMovies } = props;

  const handleLoadMore = () => {
    onFetchMoreMovies();
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <MovieList movies={movies} onLoadMore={handleLoadMore} />
      {isLoadingMore && <Spinner />}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  movies: upcomingSelectors.selectList,
  isLoading: loadingSelectors.createIsLoadingSelector([UpcomingActionTypes.FETCH_MOVIES]),
  isLoadingMore: loadingSelectors.createIsLoadingSelector([UpcomingActionTypes.FETCH_MORE_MOVIES]),
});

const mapDispatchToProps = {
  onFetchMoreMovies: upcomingActions.fetchMoreMovies,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpcomingMoviesList);
