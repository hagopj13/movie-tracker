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
import type { MoviesListItem } from 'store/common/movies/movies.reducer';

type Props = {
  moviesList: MoviesListItem[],
  isLoadingMore: boolean,
  onFetchMoreMovies: () => void,
};

const SearchResultsList = (props: Props) => {
  const { moviesList, isLoadingMore, onFetchMoreMovies } = props;

  const handleLoadMore = useCallback(() => {
    onFetchMoreMovies();
  }, [onFetchMoreMovies]);

  if (moviesList.length === 0) {
    return null;
  }

  return (
    <>
      <MoviesList moviesList={moviesList} onLoadMore={handleLoadMore} />
      {isLoadingMore && <Spinner />}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  moviesList: searchSelectors.selectList,
  isLoadingMore: loadingSelectors.createIsLoadingSelector([SearchActionTypes.FETCH_MORE_MOVIES]),
});

const mapDispatchToProps = {
  onFetchMoreMovies: searchActions.fetchMoreMovies,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsList);
