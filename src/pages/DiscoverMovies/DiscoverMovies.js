// @flow
import React, { useCallback, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import MoviesList from 'components/Movies/MoviesList/MoviesList';
import Spinner from 'components/UI/Spinner/Spinner';
import { getDiscoverMovies, getMoreDiscoverMovies } from 'store/movies/discover/discover.actions';
import { selectDiscoverMoviesList } from 'store/movies/discover/discover.selectors';
import { createIsLoadingSelector } from 'store/api/loading/loading.selectors';
import DiscoverMoviesActionTypes from 'store/movies/discover/discover.types';
import ConfigActionTypes from 'store/config/config.types';

import DiscoverMoviesFilters from './DiscoverMoviesFilters/DiscoverMoviesFilters';

type Props = {
  moviesList: any[],
  isLoadingConfig: boolean,
  isLoading: boolean,
  isLoadingMore: boolean,
  onGetDiscoverMovies: () => void,
  onGetMoreDiscoverMovies: () => void,
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
    moviesList,
    isLoadingConfig,
    isLoading,
    isLoadingMore,
    onGetDiscoverMovies,
    onGetMoreDiscoverMovies,
  } = props;

  const classes = useStyles();

  useLayoutEffect(() => {
    onGetDiscoverMovies();
  }, [onGetDiscoverMovies]);

  const handleLoadMore = useCallback(() => {
    onGetMoreDiscoverMovies();
  }, [onGetMoreDiscoverMovies]);

  const handleUpdateList = useCallback(() => {
    onGetDiscoverMovies();
  }, [onGetDiscoverMovies]);

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
            <MoviesList moviesList={moviesList} onLoadMore={handleLoadMore} />
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
          <DiscoverMoviesFilters onUpdateList={handleUpdateList} />
        </div>
        {renderList()}
      </Container>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  moviesList: selectDiscoverMoviesList,
  isLoadingConfig: createIsLoadingSelector([ConfigActionTypes.GET_CONFIG]),
  isLoading: createIsLoadingSelector([DiscoverMoviesActionTypes.GET_DISCOVER_MOVIES]),
  isLoadingMore: createIsLoadingSelector([DiscoverMoviesActionTypes.GET_MORE_DISCOVER_MOVIES]),
});

const mapDispatchToProps = {
  onGetDiscoverMovies: getDiscoverMovies,
  onGetMoreDiscoverMovies: getMoreDiscoverMovies,
};

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverMoviesPage);
