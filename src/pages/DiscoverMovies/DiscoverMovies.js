// @flow
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

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

  return (
    <div>
      {moviesList.map((movie) => (
        <p key={movie.id}>{movie.title}</p>
      ))}
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
