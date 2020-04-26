// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import MovieCast from 'components/Movie/Cast/MovieCast';
import MovieReviews from 'components/Movie/Reviews/MovieReviews';
import MovieRecommendations from 'components/Movie/Recommendations/MovieRecommendations';
import { MovieDetails } from 'types';

import MoviePageBodySection from './Section/MoviePageBodySection';

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

const MoviePageBody = (props: Props) => {
  const { movie } = props;

  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <MoviePageBodySection title="Top Cast">
        <MovieCast cast={movie.cast.slice(0, MAX_NUMBER_OF_ACTORS)} />
      </MoviePageBodySection>
      <MoviePageBodySection title="Top Reviews">
        <MovieReviews reviews={movie.reviews.slice(0, MAX_NUMBER_OF_REVIEWS)} />
      </MoviePageBodySection>
      <MoviePageBodySection title="Recommendations">
        <MovieRecommendations
          recommendations={movie.recommendations.slice(0, MAX_NUMBER_OF_RECOMMENDATIONS)}
        />
      </MoviePageBodySection>
    </Container>
  );
};

export default MoviePageBody;
