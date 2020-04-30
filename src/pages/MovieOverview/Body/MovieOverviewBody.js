// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Cast from 'components/Cast/Cast';
import Reviews from 'components/Reviews/Reviews';
import Recommendations from 'components/Recommendations/Recommendations';
import { MovieDetails } from 'types';

import MovieOverviewBodySection from './Section/MovieOverviewBodySection';

type Props = {
  movie: MovieDetails,
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5),
    '& > *': {
      marginBottom: theme.spacing(5),
      '&:last-child': {
        marginBottom: 0,
      },
    },
  },
}));

const MAX_NUMBER_OF_ACTORS = 7;
const MAX_NUMBER_OF_REVIEWS = 4;
const MAX_NUMBER_OF_RECOMMENDATIONS = 10;

const MovieOverviewBody = (props: Props) => {
  const { movie } = props;

  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <MovieOverviewBodySection title="Top Cast">
        <Cast cast={movie.cast.slice(0, MAX_NUMBER_OF_ACTORS)} />
      </MovieOverviewBodySection>
      <MovieOverviewBodySection title="Top Reviews">
        <Reviews reviews={movie.reviews.slice(0, MAX_NUMBER_OF_REVIEWS)} />
      </MovieOverviewBodySection>
      <MovieOverviewBodySection title="Recommendations">
        <Recommendations
          recommendations={movie.recommendations.slice(0, MAX_NUMBER_OF_RECOMMENDATIONS)}
        />
      </MovieOverviewBodySection>
    </Container>
  );
};

export default MovieOverviewBody;
