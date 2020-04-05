// @flow
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getDiscoverMovies } from 'store/movies/discover/discover.actions';
import { selectDiscoverMoviesList } from 'store/movies/discover/discover.selectors';
import PosterImage from 'components/UI/Image/PosterImage/PosterImage';

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
        <div key={movie.id}>
          <PosterImage src={movie.poster_path} />
        </div>
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
