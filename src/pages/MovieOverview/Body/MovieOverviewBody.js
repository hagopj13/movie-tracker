// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import ActorList from 'components/Actor/List/ActorList';
import ReviewList from 'components/Review/List/ReviewList';
// import Recommendations from 'components/Recommendations/Recommendations';
import MovieList from 'components/Movie/List/MovieList';
import { Movie } from 'types';

import MovieOverviewBodySection from './Section/MovieOverviewBodySection';

type Props = {
  movie: Movie,
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

  const actors = movie.actors?.slice(0, MAX_NUMBER_OF_ACTORS) ?? [];
  const reviews = movie.reviews?.slice(0, MAX_NUMBER_OF_REVIEWS) ?? [];
  const recommendations = movie.recommendations?.slice(0, MAX_NUMBER_OF_RECOMMENDATIONS) ?? [];

  return (
    <Container className={classes.root}>
      <MovieOverviewBodySection title="Top Cast">
        <ActorList actors={actors} />
      </MovieOverviewBodySection>
      <MovieOverviewBodySection title="Top Reviews">
        <ReviewList reviews={reviews} />
      </MovieOverviewBodySection>
      <MovieOverviewBodySection title="Recommendations">
        <MovieList movies={recommendations} center={false} />
      </MovieOverviewBodySection>
    </Container>
  );
};

export default MovieOverviewBody;
