// @flow
import React, { useCallback, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import MoviesList from 'components/Movies/MoviesList/MoviesList';
import Spinner from 'components/UI/Spinner/Spinner';
import discoverActions from 'store/discover/discover.actions';
import discoverSelectors from 'store/discover/discover.selectors';
import DiscoverActionTypes from 'store/discover/discover.types';
import { createIsLoadingSelector } from 'store/api/loading/loading.selectors';
import ConfigActionTypes from 'store/config/config.types';

import DiscoverMoviesFilters from './DiscoverMoviesFilters/DiscoverMoviesFilters';

type Props = {
  moviesResults: any[],
  isLoadingConfig: boolean,
  isLoading: boolean,
  isLoadingMore: boolean,
  onFetchMovies: () => void,
  onFetchMoreMovies: () => void,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    padding: theme.spacing(5, 5, 1),
    display: 'flex',
  },
  moviesFiltersContainer: {
    maxWidth: 250,
    marginRight: theme.spacing(2),
  },
  moviesListContainer: {
    flexGrow: 1,
  },
}));

const DiscoverMoviesPage = (props: Props) => {
  const {
    moviesResults,
    isLoadingConfig,
    isLoading,
    isLoadingMore,
    onFetchMovies,
    onFetchMoreMovies,
  } = props;

  const classes = useStyles();

  useLayoutEffect(() => {
    onFetchMovies();
  }, [onFetchMovies]);

  const handleLoadMore = useCallback(() => {
    onFetchMoreMovies();
  }, [onFetchMoreMovies]);

  const handleUpdateResults = useCallback(() => {
    onFetchMovies();
  }, [onFetchMovies]);

  if (isLoadingConfig) {
    return <Spinner />;
  }

  const renderList = () => {
    return (
      <div className={classes.moviesListContainer}>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <MoviesList moviesList={moviesResults} onLoadMore={handleLoadMore} />
            {isLoadingMore && <Spinner />}
          </>
        )}
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <div className={classes.moviesFiltersContainer}>
          <DiscoverMoviesFilters onUpdateResults={handleUpdateResults} />
        </div>
        {renderList()}
      </Container>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  moviesResults: discoverSelectors.selectResults,
  isLoadingConfig: createIsLoadingSelector([ConfigActionTypes.GET_CONFIG]),
  isLoading: createIsLoadingSelector([DiscoverActionTypes.FETCH_MOVIES]),
  isLoadingMore: createIsLoadingSelector([DiscoverActionTypes.FETCH_MORE_MOVIES]),
});

const mapDispatchToProps = {
  onFetchMovies: discoverActions.fetchMovies,
  onFetchMoreMovies: discoverActions.fetchMoreMovies,
};

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverMoviesPage);
