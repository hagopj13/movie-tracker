// @flow
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import MovieList from 'components/Movie/List/MovieList';
import Spinner from 'components/Spinner/Spinner';
import searchActions from 'store/search/search.actions';
import searchSelectors from 'store/search/search.selectors';
import SearchActionTypes from 'store/search/search.types';
import loadingSelectors from 'store/api/loading/loading.selectors';
import type { Movie } from 'types';

type Props = {
  movies: Movie[],
  isLoadingMore: boolean,
  onFetchMoreMovies: () => void,
};

export const SearchResultsList = (props: Props) => {
  const { movies, isLoadingMore, onFetchMoreMovies } = props;

  const handleLoadMore = () => {
    onFetchMoreMovies();
  };

  if (movies.length === 0) {
    return null;
  }

  return (
    <>
      <MovieList movies={movies} onLoadMore={handleLoadMore} />
      {isLoadingMore && <Spinner />}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  movies: searchSelectors.selectList,
  isLoadingMore: loadingSelectors.createIsLoadingSelector([SearchActionTypes.FETCH_MORE_MOVIES]),
});

const mapDispatchToProps = {
  onFetchMoreMovies: searchActions.fetchMoreMovies,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsList);
