// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import type { Review } from 'types';

import ReviewListItem from './Item/ReviewListItem';

type Props = {
  reviews: Review[],
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
  noReviewsText: {
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const ReviewList = (props: Props) => {
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
        <ReviewListItem key={review.id} review={review} />
      ))}
    </div>
  );
};

export default ReviewList;
