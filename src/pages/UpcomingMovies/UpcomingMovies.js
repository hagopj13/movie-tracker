// @flow
import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Spinner from 'components/Spinner/Spinner';
import upcomingActions from 'store/upcoming/upcoming.actions';
import loadingSelectors from 'store/api/loading/loading.selectors';
import ConfigActionTypes from 'store/config/config.types';

import UpcomingMoviesList from './List/UpcomingMoviesList';

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
    padding: theme.spacing(5, 5, 2),
    display: 'flex',
  },
  movieListContainer: {
    flexGrow: 1,
  },
}));

export const UpcomingMovies = (props: Props) => {
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
        <div className={classes.movieListContainer}>
          <UpcomingMoviesList />
        </div>
      </Container>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoadingConfig: loadingSelectors.createIsLoadingSelector([
    ConfigActionTypes.FETCH_IMAGES_CONFIG,
  ]),
});

const mapDispatchToProps = {
  onFetchMovies: upcomingActions.fetchMovies,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpcomingMovies);
