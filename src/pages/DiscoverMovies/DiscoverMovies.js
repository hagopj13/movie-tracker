// @flow
import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Spinner from 'components/UI/Spinner/Spinner';
import discoverActions from 'store/discover/discover.actions';
import { createIsLoadingSelector } from 'store/api/loading/loading.selectors';
import ConfigActionTypes from 'store/config/config.types';

import DiscoverMoviesList from './DiscoverMoviesList/DiscoverMoviesList';
import DiscoverMoviesFilters from './DiscoverMoviesFilters/DiscoverMoviesFilters';

type Props = {
  isLoadingConfig: boolean,
  onFetchMovies: () => void,
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
  const { isLoadingConfig, onFetchMovies } = props;

  const classes = useStyles();

  useLayoutEffect(() => {
    onFetchMovies();
  }, [onFetchMovies]);

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
  isLoadingConfig: createIsLoadingSelector([ConfigActionTypes.GET_CONFIG]),
});

const mapDispatchToProps = {
  onFetchMovies: discoverActions.fetchMovies,
};

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverMoviesPage);
