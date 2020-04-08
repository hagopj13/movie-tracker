// @flow
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import MoviesList from 'components/Movies/MoviesList/MoviesList';
import { getDiscoverMovies } from 'store/movies/discover/discover.actions';
import { selectDiscoverMoviesList } from 'store/movies/discover/discover.selectors';

type Props = {
  moviesList: any[],
  onGetDiscoverMovies: () => void,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    padding: theme.spacing(5),
  },
}));

const DiscoverMoviesPage = (props: Props) => {
  const { moviesList, onGetDiscoverMovies } = props;

  const classes = useStyles();

  useEffect(() => {
    onGetDiscoverMovies();
  }, [onGetDiscoverMovies]);

  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <MoviesList moviesList={moviesList} />
      </Container>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  moviesList: selectDiscoverMoviesList,
});

const mapDispatchToProps = {
  onGetDiscoverMovies: getDiscoverMovies,
};

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverMoviesPage);
