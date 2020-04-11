// @flow
export type MoviesListResult = {
  id: string,
  title: string,
  releaseDate: string,
  voteAverage: number,
  posterPath: string,
};

export const convertResultsToMoviesList = (results: any): MoviesListResult[] => {
  return results.map((result) => ({
    id: result.id,
    title: result.title,
    releaseDate: result.release_date,
    voteAverage: result.vote_average / 2,
    posterPath: result.poster_path,
  }));
};
