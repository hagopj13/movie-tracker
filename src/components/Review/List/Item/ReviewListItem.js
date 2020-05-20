/* eslint-disable react/no-array-index-key */
// @flow
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Truncate from 'react-truncate';

import type { Review } from 'types';

type Props = {
  review: Review,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    padding: theme.spacing(3),
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    marginRight: theme.spacing(3),
  },
  contentContainer: {
    flexGrow: 1,
  },
  content: {
    letterSpacing: 0,
  },
}));

const MAX_NUMBER_OF_LINES_IF_NOT_EXPANDED = 5;

const ReviewsListItem = (props: Props) => {
  const { review } = props;

  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const classes = useStyles();

  const getAuthorFirstLetter = () =>
    review.author?.length > 0 ? review.author.charAt(0).toUpperCase() : '';

  const handleTruncate = (truncated) => {
    if (isTruncated !== truncated) {
      setIsTruncated(truncated);
    }
  };

  const handleToggleExpanded = (event) => {
    event.preventDefault();
    setIsExpanded(!isExpanded);
  };

  const renderText = () => {
    return review.content.split('\n').map((line, i, arr) => {
      const lineSpan = <span key={i}>{line}</span>;

      if (i === arr.length - 1) {
        return lineSpan;
      }
      return [lineSpan, <br key={`${i}_br`} />];
    });
  };

  const renderEllipsis = () => (
    <Link href="#" onClick={handleToggleExpanded} color="primary">
      ...show more
    </Link>
  );

  const renderShowLess = () => (
    <Link href="#" onClick={handleToggleExpanded} color="primary">
      show less
    </Link>
  );

  return (
    <Paper className={classes.root} elevation={3}>
      <Avatar className={classes.avatar}>{getAuthorFirstLetter()}</Avatar>
      <div className={classes.contentContainer}>
        <Typography gutterBottom variant="h6">
          {review.author}
        </Typography>
        <Typography className={classes.content}>
          <Truncate
            lines={!isExpanded && MAX_NUMBER_OF_LINES_IF_NOT_EXPANDED}
            ellipsis={renderEllipsis()}
            onTruncate={handleTruncate}
          >
            {renderText()}
          </Truncate>
          {!isTruncated && isExpanded && renderShowLess()}
        </Typography>
      </div>
    </Paper>
  );
};

export default ReviewsListItem;
