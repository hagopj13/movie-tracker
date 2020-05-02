// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import InfiniteScroll from 'components/InfiniteScroll/InfiniteScroll';
import type { Movie } from 'types';

import MovieListItem from './Item/MovieListItem';

type Props = {
  movies: Movie[],
  // eslint-disable-next-line react/no-unused-prop-types
  center?: boolean,
  onLoadMore?: () => void,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: (props: Props) => (props.center ? 'center' : 'flex-start'),
    margin: theme.spacing(-4, 0, 0, -4),
    '& > *': {
      margin: theme.spacing(4, 0, 0, 4),
    },
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
    },
  },
  noResultsText: {
    fontWeight: theme.typography.fontWeightRegular,
    textAlign: (props: Props) => (props.center ? 'center' : 'left'),
  },
}));

const MovieList = (props: Props) => {
  const { movies, onLoadMore } = props;

  const classes = useStyles(props);

  if (movies.length === 0) {
    return (
      <Typography className={classes.noResultsText} variant="h6">
        No movies found
      </Typography>
    );
  }

  const renderList = () => (
    <div className={classes.root}>
      {movies.map((movie) => (
        <MovieListItem key={movie.id} movie={movie} />
      ))}
    </div>
  );

  if (!onLoadMore) {
    return renderList();
  }

  return <InfiniteScroll onLoadMore={onLoadMore}>{renderList()}</InfiniteScroll>;
};

MovieList.defaultProps = {
  center: true,
  onLoadMore: undefined,
};

export default MovieList;
