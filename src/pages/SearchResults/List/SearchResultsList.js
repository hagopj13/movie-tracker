// @flow
import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import MoviesList from 'components/Movies/List/MoviesList';
import Spinner from 'components/Spinner/Spinner';
import searchActions from 'store/search/search.actions';
import searchSelectors from 'store/search/search.selectors';
import SearchActionTypes from 'store/search/search.types';
import loadingSelectors from 'store/api/loading/loading.selectors';
import type { MoviesResultsItem } from 'store/common/movies/movies.reducer';

type Props = {
  moviesResults: MoviesResultsItem[],
  isLoadingMore: boolean,
  onFetchMoreMovies: () => void,
};

const SearchResultsList = (props: Props) => {
  const { moviesResults, isLoadingMore, onFetchMoreMovies } = props;

  const handleLoadMore = useCallback(() => {
    onFetchMoreMovies();
  }, [onFetchMoreMovies]);

  if (moviesResults.length === 0) {
    return null;
  }

  return (
    <>
      <MoviesList moviesList={moviesResults} onLoadMore={handleLoadMore} />
      {isLoadingMore && <Spinner />}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  moviesResults: searchSelectors.selectResults,
  isLoadingMore: loadingSelectors.createIsLoadingSelector([SearchActionTypes.FETCH_MORE_MOVIES]),
});

const mapDispatchToProps = {
  onFetchMoreMovies: searchActions.fetchMoreMovies,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsList);
