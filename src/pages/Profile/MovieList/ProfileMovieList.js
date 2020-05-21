// @flow
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import MovieList from 'components/Movie/List/MovieList';
import Spinner from 'components/Spinner/Spinner';
import type { Movie } from 'types';

type Props = {
  movies: Movie[],
  isLoading: boolean,
  isLoadingMore: boolean,
  onFetchMovies: () => void,
  onFetchMoreMovies: () => void,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    padding: theme.spacing(5, 5, 2),
  },
}));

export const ProfileMovieList = (props: Props) => {
  const { movies, isLoading, isLoadingMore, onFetchMovies, onFetchMoreMovies } = props;

  const [showView, setShowView] = useState(false);
  const classes = useStyles();

  // Show the view after some timeout, because of lagging tab switch when view is shown instantly
  useEffect(() => {
    const timeout = setTimeout(() => {
      onFetchMovies();
      setShowView(true);
    }, 200);
    return () => clearTimeout(timeout);
  }, [onFetchMovies]);

  if (!showView) {
    return null;
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <MovieList movies={movies} onLoadMore={onFetchMoreMovies} />
        {isLoadingMore && <Spinner />}
      </Container>
    </div>
  );
};

export default ProfileMovieList;
