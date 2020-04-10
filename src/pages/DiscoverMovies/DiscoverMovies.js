// @flow
import React, { useEffect, useCallback } from 'react';
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

type Props = {
  moviesList: any[],
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
  },
}));

const DiscoverMoviesPage = (props: Props) => {
  const {
    moviesList,
    isLoading,
    isLoadingMore,
    onGetDiscoverMovies,
    onGetMoreDiscoverMovies,
  } = props;

  const classes = useStyles();

  useEffect(() => {
    onGetDiscoverMovies();
  }, [onGetDiscoverMovies]);

  const handleLoadMore = useCallback(() => {
    onGetMoreDiscoverMovies();
  }, [onGetMoreDiscoverMovies]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <MoviesList moviesList={moviesList} onLoadMore={handleLoadMore} />
        {isLoadingMore && <Spinner />}
      </Container>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  moviesList: selectDiscoverMoviesList,
  isLoading: createIsLoadingSelector([
    DiscoverMoviesActionTypes.GET_DISCOVER_MOVIES,
    ConfigActionTypes.GET_CONFIG,
  ]),
  isLoadingMore: createIsLoadingSelector([DiscoverMoviesActionTypes.GET_MORE_DISCOVER_MOVIES]),
});

const mapDispatchToProps = {
  onGetDiscoverMovies: getDiscoverMovies,
  onGetMoreDiscoverMovies: getMoreDiscoverMovies,
};

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverMoviesPage);
