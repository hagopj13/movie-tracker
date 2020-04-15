// @flow
import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Spinner from 'components/Spinner/Spinner';
import discoverActions from 'store/discover/discover.actions';
import loadingSelectors from 'store/api/loading/loading.selectors';
import ConfigActionTypes from 'store/config/config.types';
import configActions from 'store/config/config.actions';

import DiscoverMoviesList from './DiscoverMoviesList/DiscoverMoviesList';
import DiscoverMoviesFilters from './DiscoverMoviesFilters/DiscoverMoviesFilters';

type Props = {
  isLoadingConfig: boolean,
  onGetAllGenres: () => void,
  onFetchMovies: () => void,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    padding: theme.spacing(5, 5, 2),
    display: 'flex',
  },
  moviesFiltersContainer: {
    maxWidth: 270,
    marginRight: theme.spacing(3),
  },
  moviesListContainer: {
    flexGrow: 1,
  },
}));

const DiscoverMoviesPage = (props: Props) => {
  const { isLoadingConfig, onGetAllGenres, onFetchMovies } = props;

  const classes = useStyles();

  useLayoutEffect(() => {
    onGetAllGenres();
    onFetchMovies();
  }, [onGetAllGenres, onFetchMovies]);

  if (isLoadingConfig) {
    return <Spinner />;
  }

  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <div className={classes.moviesFiltersContainer}>
          <DiscoverMoviesFilters />
        </div>
        <div className={classes.moviesListContainer}>
          <DiscoverMoviesList />
        </div>
      </Container>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoadingConfig: loadingSelectors.createIsLoadingSelector([
    ConfigActionTypes.GET_IMAGES_CONFIG,
    ConfigActionTypes.GET_ALL_GENRES,
  ]),
});

const mapDispatchToProps = {
  onGetAllGenres: configActions.getAllGenres,
  onFetchMovies: discoverActions.fetchMovies,
};

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverMoviesPage);
