// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';

import MovieBackdrop from 'components/Movie/Backdrop/MovieBackdrop';
import MoviePoster from 'components/Movie/Poster/MoviePoster';
import MovieSummary from 'components/Movie/Summary/MovieSummary';
import MovieActions from 'components/Movie/Actions/MovieActions';
import type { Movie } from 'types';

type Props = {
  movie: Movie,
};

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.common.white,
    padding: theme.spacing(5),
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  poster: {
    borderRadius: 8,
    width: 300,
    minWidth: 300,
    height: 450,
    marginRight: theme.spacing(5),
    [theme.breakpoints.down('xs')]: {
      marginRight: 0,
      marginBottom: theme.spacing(2),
    },
  },
  infoContainer: {
    paddingTop: theme.spacing(1),
  },
  actionsContainer: {
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
}));

const MovieOverviewHeader = (props: Props) => {
  const { movie } = props;

  const classes = useStyles();

  return (
    <MovieBackdrop backdropPath={movie.backdropPath}>
      <Container className={classes.root}>
        <Card className={classes.poster} elevation={5}>
          <MoviePoster posterPath={movie.posterPath} height={450} width={300} />
        </Card>
        <div className={classes.infoContainer}>
          <MovieSummary movie={movie} />
          <div className={classes.actionsContainer}>
            <MovieActions movie={movie} />
          </div>
        </div>
      </Container>
    </MovieBackdrop>
  );
};

export default MovieOverviewHeader;
