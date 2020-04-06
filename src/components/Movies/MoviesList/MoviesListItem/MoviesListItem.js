// @flow
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { createPosterFullPathSelector } from 'store/config/config.selectors';
import type { MoviesListResult } from 'store/movies/movies.utils';

type Props = {
  movie: MoviesListResult,
  fullPosterPath: string,
};

const useStyles = makeStyles({
  root: {
    maxWidth: 200,
  },
  media: {
    height: 300,
  },
});

const MoviesListItem = (props: Props) => {
  const { movie, fullPosterPath } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={fullPosterPath} />
        <CardContent>
          <Typography glutterBottom variant="h6">
            {movie.title}
          </Typography>
          <Typography>{movie.releaseDate}</Typography>
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
