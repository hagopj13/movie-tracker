// @flow
export type MoviesListResult = {
  id: string,
  title: string,
  releaseDate: string,
  voteAverage: number,
  voteCount: number,
  posterPath: string,
};

export const convertResultsToMoviesList = (results: any): MoviesListResult[] => {
  return results.map((result) => ({
    id: result.id,
    title: result.title,
    releaseDate: result.release_date,
    voteAverage: Math.round((result.vote_average / 2) * 10) / 10,
    voteCount: result.vote_count,
    posterPath: result.poster_path,
  }));
};
