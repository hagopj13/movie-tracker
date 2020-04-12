// @flow
import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Image from '@material-ui/icons/Image';

import { createPosterFullPathSelector } from 'store/config/config.selectors';
import type { MoviesListResult } from 'store/movies/movies.utils';

type Props = {
  movie: MoviesListResult,
  fullPosterPath: string,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: 200,
    minWidth: 200,
    cursor: 'pointer',
  },
  media: {
    height: 300,
  },
  brokenMediaContainer: {
    height: 300,
    width: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.grey[200],
  },
  brokenMedia: {},
  rating: {
    display: 'flex',
    marginTop: theme.spacing(0.75),
  },
  ratingText: {
    marginLeft: theme.spacing(0.5),
  },
}));

const MoviesListItem = (props: Props) => {
  const { movie, fullPosterPath } = props;

  const classes = useStyles();
  const history = useHistory();

  const formattedDate = movie.releaseDate
    ? moment(movie.releaseDate).format('MMM D, YYYY')
    : 'Unknown release date';

  const handleItemClick = useCallback(() => {
    history.push(`/movies/${movie.id}`);
  }, [history, movie]);

  const renderMedia = () => {
    return movie.posterPath ? (
      <CardMedia className={classes.media} image={fullPosterPath} />
    ) : (
      <div className={classes.brokenMediaContainer}>
        <Image fontSize="large" />
      </div>
    );
  };

  return (
    <Card className={classes.root} elevation={3} onClick={handleItemClick}>
      <CardActionArea>
        {renderMedia()}
        <CardContent>
          <Typography gutterBottom variant="h6">
            {movie.title}
          </Typography>
          <Typography>{formattedDate}</Typography>
          <div className={classes.rating}>
            <Rating value={movie.voteAverage} precision={0.5} readOnly />
            <Typography className={classes.ratingText}>{movie.voteAverage}</Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const mapStateToProps = createStructuredSelector({
  fullPosterPath: (state, ownProps: Props) =>
    createPosterFullPathSelector(ownProps.movie.posterPath)(state),
});

export default connect(mapStateToProps)(MoviesListItem);
