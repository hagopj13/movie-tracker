// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Review from 'components/Review/Review';
import type { Review as ReviewType } from 'types';

type Props = {
  reviews: ReviewType[],
};

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 500,
    '& > *': {
      marginBottom: theme.spacing(3),
      '&:last-child': {
        marginBottom: 0,
      },
    },
  },
  noReviewsText: {
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const MovieReviews = (props: Props) => {
  const { reviews } = props;

  const classes = useStyles();

  if (reviews.length === 0) {
    return (
      <Typography className={classes.noReviewsText} variant="h6">
        No reviews found
      </Typography>
    );
  }

  return (
    <div className={classes.root}>
      {reviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </div>
  );
};

export default MovieReviews;
