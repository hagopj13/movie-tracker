// @flow
import React from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';

import MoviePoster from 'components/Movie/Poster/MoviePoster';
import type { Movie } from 'types';

type Props = {
  movie: Movie,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: 200,
    minWidth: 200,
    cursor: 'pointer',
  },
  title: {
    fontSize: 16,
  },
  rating: {
    display: 'flex',
    marginTop: theme.spacing(0.75),
  },
  ratingText: {
    marginLeft: theme.spacing(0.5),
  },
}));

const MovieListItem = (props: Props) => {
  const { movie } = props;

  const classes = useStyles();
  const history = useHistory();

  const formattedDate = movie.releaseDate
    ? moment(movie.releaseDate).format('MMM D, YYYY')
    : 'Unknown release date';

  const handleItemClick = () => {
    history.push(`/movies/${movie.id}`);
  };

  const renderRating = () => {
    return movie.voteCount ? (
      <>
        <Rating value={movie.voteAverage} precision={0.5} readOnly />
        <Typography className={classes.ratingText}>{movie.voteAverage}</Typography>
      </>
    ) : (
      <Typography>Not rated yet</Typography>
    );
  };

  return (
    <Card className={classes.root} elevation={3} onClick={handleItemClick}>
      <CardActionArea>
        <MoviePoster posterPath={movie.posterPath} height={300} width={200} />
        <CardContent>
          <Typography className={classes.title} gutterBottom variant="h6">
            {movie.title}
          </Typography>
          <Typography>{formattedDate}</Typography>
          <div className={classes.rating}>{renderRating()}</div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MovieListItem;
