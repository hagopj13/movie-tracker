// @flow
import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Spinner from 'components/Spinner/Spinner';
import Attribution from 'components/Attribution/Attribution';
import discoverActions from 'store/discover/discover.actions';
import loadingSelectors from 'store/api/loading/loading.selectors';
import ConfigActionTypes from 'store/config/config.types';
import configActions from 'store/config/config.actions';

import DiscoverMoviesList from './List/DiscoverMoviesList';
import DiscoverMoviesFilters from './Filters/DiscoverMoviesFilters';

type Props = {
  isLoadingConfig: boolean,
  onFetchAllGenres: () => void,
  onFetchMovies: () => void,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  attributionContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(5, 5, 0),
  },
  moviesContainer: {
    display: 'flex',
    padding: theme.spacing(5, 5, 2),
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  movieFiltersContainer: {
    maxWidth: 270,
    marginRight: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      maxWidth: 330,
      marginRight: 0,
      marginBottom: theme.spacing(3),
    },
  },
  movieListContainer: {
    flexGrow: 1,
  },
}));

export const DiscoverMovies = (props: Props) => {
  const { isLoadingConfig, onFetchAllGenres, onFetchMovies } = props;

  const classes = useStyles();

  useLayoutEffect(() => {
    onFetchAllGenres();
    onFetchMovies();
  }, [onFetchAllGenres, onFetchMovies]);

  if (isLoadingConfig) {
    return <Spinner />;
  }

  return (
    <div className={classes.root}>
      <Container className={classes.attributionContainer}>
        <Attribution />
      </Container>
      <Container className={classes.moviesContainer}>
        <div className={classes.movieFiltersContainer}>
          <DiscoverMoviesFilters />
        </div>
        <div className={classes.movieListContainer}>
          <DiscoverMoviesList />
        </div>
      </Container>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoadingConfig: loadingSelectors.createIsLoadingSelector([
    ConfigActionTypes.FETCH_IMAGES_CONFIG,
    ConfigActionTypes.FETCH_ALL_GENRES,
  ]),
});

const mapDispatchToProps = {
  onFetchAllGenres: configActions.fetchAllGenres,
  onFetchMovies: discoverActions.fetchMovies,
};

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverMovies);
