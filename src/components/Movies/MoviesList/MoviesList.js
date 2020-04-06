// @flow
import React from 'react';

import type { MoviesListResult } from 'store/movies/movies.utils';

import MoviesListItem from './MoviesListItem/MoviesListItem';

type Props = {
  moviesList: MoviesListResult[],
};

const MoviesList = (props: Props) => {
  const { moviesList } = props;
  return moviesList.map((movie) => <MoviesListItem key={movie.id} movie={movie} />);
};

export default MoviesList;
