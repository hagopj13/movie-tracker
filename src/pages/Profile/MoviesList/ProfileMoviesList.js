// @flow
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import MoviesList from 'components/Movies/List/MoviesList';
import Spinner from 'components/Spinner/Spinner';
import type { MoviesListItem } from 'types';

type Props = {
  moviesList: MoviesListItem[],
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

const ProfileMoviesList = (props: Props) => {
  const { moviesList, isLoading, isLoadingMore, onFetchMovies, onFetchMoreMovies } = props;

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

  const handleLoadMore = () => {
    onFetchMoreMovies();
  };

  if (!showView) {
    return null;
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <MoviesList moviesList={moviesList} onLoadMore={handleLoadMore} />
        {isLoadingMore && <Spinner />}
      </Container>
    </div>
  );
};

export default ProfileMoviesList;
