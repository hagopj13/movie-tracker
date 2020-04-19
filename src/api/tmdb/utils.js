import type { MoviesListItem } from 'store/common/movies/movies.reducer';
import type { MovieDetails } from 'store/movieDetails/movieDetails.reducer';

export const convertResponseToMoviesList = (response: any): MoviesListItem[] =>
  response.results.map((result) => ({
    id: result.id,
    title: result.title,
    releaseDate: result.release_date,
    voteAverage: Math.round((result.vote_average / 2) * 10) / 10,
    voteCount: result.vote_count,
    posterPath: result.poster_path,
  }));

export const convertResponseToMovieDetails = (response: any): MovieDetails => ({
  id: response.id,
  title: response.title,
});
