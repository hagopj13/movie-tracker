// @flow
import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import MovieActionTypes from 'store/movie/movie.types';
import movieActions from 'store/movie/movie.actions';
import movieSelectors from 'store/movie/movie.selectors';
import loadingSelectors from 'store/api/loading/loading.selectors';
import ConfigActionTypes from 'store/config/config.types';
import Spinner from 'components/Spinner/Spinner';
import type { MovieDetails } from 'types';

import MoviePageHeader from './Header/MoviePageHeader';

type Props = {
  isLoading: boolean,
  movie: MovieDetails,
  onFetchMovie: (id: string) => void,
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

const MoviePage = (props: Props) => {
  const { isLoading, movie, onFetchMovie } = props;

  const { id } = useParams();

  const classes = useStyles();

  useLayoutEffect(() => {
    if (id) {
      onFetchMovie(id);
    }
  }, [id, onFetchMovie]);

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
      <MoviePageHeader movie={movie} />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: loadingSelectors.createIsLoadingSelector([
    MovieActionTypes.FETCH_MOVIE,
    ConfigActionTypes.FETCH_IMAGES_CONFIG,
  ]),
  movie: movieSelectors.selectMovieDetails,
});

const mapDispatchToProps = {
  onFetchMovie: movieActions.fetchMovie,
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
