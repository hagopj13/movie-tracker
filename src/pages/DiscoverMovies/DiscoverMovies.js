// @flow
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import MoviesList from 'components/Movies/MoviesList/MoviesList';
import { getDiscoverMovies } from 'store/movies/discover/discover.actions';
import { selectDiscoverMoviesList } from 'store/movies/discover/discover.selectors';

type Props = {
  moviesList: any[],
  onGetDiscoverMovies: () => void,
};

const DiscoverMoviesPage = (props: Props) => {
  const { moviesList, onGetDiscoverMovies } = props;

  useEffect(() => {
    onGetDiscoverMovies();
  }, [onGetDiscoverMovies]);

  return <MoviesList moviesList={moviesList} />;
};

const mapStateToProps = createStructuredSelector({
  moviesList: selectDiscoverMoviesList,
});

const mapDispatchToProps = {
  onGetDiscoverMovies: getDiscoverMovies,
};

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverMoviesPage);
