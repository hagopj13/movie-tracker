// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Review from 'components/Review/Review';
import type { Review as ReviewType } from 'types';

type Props = {
  reviews: ReviewType[],
};

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginBottom: theme.spacing(3),
      '&:last-child': {
        marginBottom: 0,
      },
    },
  },
}));

const MovieReviews = (props: Props) => {
  const { reviews } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      {reviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </div>
  );
};

export default MovieReviews;
