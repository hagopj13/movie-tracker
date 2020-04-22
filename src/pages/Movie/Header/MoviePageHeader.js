// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import MovieBackdrop from 'components/Movie/Backdrop/MovieBackdrop';
import type { MovieDetails } from 'types';

type Props = {
  movie: MovieDetails,
};

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.common.white,
    padding: theme.spacing(5),
    minHeight: 600,
  },
}));

const MoviePageHeader = (props: Props) => {
  const { movie } = props;

  const classes = useStyles();

  return (
    <MovieBackdrop backdropPath={movie.backdropPath}>
      <Container className={classes.root}>{movie.title}</Container>
    </MovieBackdrop>
  );
};

export default MoviePageHeader;
