// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';

import MovieBackdrop from 'components/Movie/Backdrop/MovieBackdrop';
import MoviePoster from 'components/Movie/Poster/MoviePoster';
import type { MovieDetails } from 'types';

type Props = {
  movie: MovieDetails,
};

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.common.white,
    padding: theme.spacing(5),
  },
  poster: {
    borderRadius: 8,
    width: 300,
  },
}));

const MoviePageHeader = (props: Props) => {
  const { movie } = props;

  const classes = useStyles();

  return (
    <MovieBackdrop backdropPath={movie.backdropPath}>
      <Container className={classes.root}>
        <Card className={classes.poster} elevation={5}>
          <MoviePoster posterPath={movie.posterPath} height={450} width={300} />
        </Card>
      </Container>
    </MovieBackdrop>
  );
};

export default MoviePageHeader;
