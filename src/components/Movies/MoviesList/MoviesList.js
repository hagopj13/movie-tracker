// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import type { MoviesListResult } from 'store/movies/movies.utils';

import MoviesListItem from './MoviesListItem/MoviesListItem';

type Props = {
  moviesList: MoviesListResult[],
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: theme.spacing(-4, 0, 0, -4),
    '& > *': {
      margin: theme.spacing(4, 0, 0, 4),
    },
  },
}));

const MoviesList = (props: Props) => {
  const { moviesList } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      {moviesList.map((movie) => (
        <MoviesListItem key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MoviesList;
