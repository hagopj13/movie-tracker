// @flow
import React, { useLayoutEffect, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import MovieActionTypes from 'store/movie/movie.types';
import movieActions from 'store/movie/movie.actions';
import movieSelectors from 'store/movie/movie.selectors';
import authSelectors from 'store/auth/auth.selectors';
import loadingSelectors from 'store/api/loading/loading.selectors';
import ConfigActionTypes from 'store/config/config.types';
import Spinner from 'components/Spinner/Spinner';
import type { Movie } from 'types';

import MovieOverviewHeader from './Header/MovieOverviewHeader';
import MovieOverviewBody from './Body/MovieOverviewBody';

type Props = {
  isLoading: boolean,
  movie: Movie,
  isAuth: boolean,
  onFetchMovie: (id: string) => void,
  onUpdateMovieUserState: (id: string) => void,
};

const useStyles = makeStyles((theme) => ({
  spinnerContainer: {
    marginTop: theme.spacing(5),
  },
  notFoundText: {
    marginTop: theme.spacing(5),
    textAlign: 'center',
  },
}));

export const MovieOverview = (props: Props) => {
  const { isLoading, movie, isAuth, onFetchMovie, onUpdateMovieUserState } = props;

  const isAuthRef = useRef(isAuth);
  const { id } = useParams();

  const classes = useStyles();

  useLayoutEffect(() => {
    if (id) {
      onFetchMovie(id);
    }
  }, [id, onFetchMovie]);

  useEffect(() => {
    if (isAuth !== isAuthRef.current) {
      isAuthRef.current = isAuth;
      if (id && isAuth) {
        onUpdateMovieUserState(id);
      }
    }
  }, [id, isAuth, onUpdateMovieUserState]);

  if (isLoading) {
    return (
      <Container className={classes.spinnerContainer}>
        <Spinner />
      </Container>
    );
  }

  if (!movie) {
    return (
      <Typography className={classes.notFoundText} variant="h5">
        Movie not found!
      </Typography>
    );
  }

  return (
    <div>
      <MovieOverviewHeader movie={movie} />
      <MovieOverviewBody movie={movie} />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: loadingSelectors.createIsLoadingSelector([
    MovieActionTypes.FETCH_MOVIE,
    ConfigActionTypes.FETCH_IMAGES_CONFIG,
  ]),
  movie: movieSelectors.selectMovieDetails,
  isAuth: authSelectors.selectIsAuth,
});

const mapDispatchToProps = {
  onFetchMovie: movieActions.fetchMovie,
  onUpdateMovieUserState: movieActions.fetchMovieUserState,
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieOverview);
