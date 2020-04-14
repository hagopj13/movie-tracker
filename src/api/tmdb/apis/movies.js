// @flow
import axios from '../axiosInstance';

export type GetDiscoverMoviesParams = {
  page?: number,
  sort_by: string,
  'vote_count.gte'?: number,
  with_genres?: string,
  'primary_release_date.gte'?: string,
  'primary_release_date.lte'?: string,
};
export const getDiscoverMovies = (params: GetDiscoverMoviesParams) =>
  axios.get('/discover/movie', { params });
