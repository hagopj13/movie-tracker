// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import type { MoviesListItem } from 'types';

import MovieCard from 'components/Movie/Card/MovieCard';

type Props = {
  recommendations: MoviesListItem[],
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: theme.spacing(-4, 0, 0, -4),
    '& > *': {
      margin: theme.spacing(4, 0, 0, 4),
    },
  },
  noRecommendationsText: {
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const MoviesList = (props: Props) => {
  const { recommendations } = props;
  const classes = useStyles();

  if (recommendations.length === 0) {
    return (
      <Typography className={classes.noRecommendationsText} variant="h6">
        No recommendations found
      </Typography>
    );
  }

  return (
    <div className={classes.root}>
      {recommendations.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MoviesList;
