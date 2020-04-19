// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import InfiniteScroll from 'components/InfiniteScroll/InfiniteScroll';
import type { MoviesListItem as MoviesListItemType } from 'store/common/movies/movies.reducer';

import MoviesListItem from './Item/MoviesListItem';

type Props = {
  moviesList: MoviesListItemType[],
  onLoadMore: () => void,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: theme.spacing(-4, 0, 0, -4),
    '& > *': {
      margin: theme.spacing(4, 0, 0, 4),
    },
  },
  noResultsText: {
    fontWeight: theme.typography.fontWeightRegular,
    marginTop: theme.spacing(2),
    textAlign: 'center',
  },
}));

const MoviesList = (props: Props) => {
  const { moviesList, onLoadMore } = props;
  const classes = useStyles();

  if (moviesList.length === 0) {
    return (
      <Typography className={classes.noResultsText} variant="h6">
        No results found!
      </Typography>
    );
  }

  return (
    <InfiniteScroll onLoadMore={onLoadMore}>
      <div className={classes.root}>
        {moviesList.map((movie) => (
          <MoviesListItem key={movie.id} movie={movie} />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default MoviesList;
