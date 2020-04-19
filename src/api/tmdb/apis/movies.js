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

export type GetUpcomingMoviesParams = {
  page?: number,
};
export const getUpcomingMovies = (params: GetUpcomingMoviesParams) =>
  axios.get('/movie/upcoming', { params });

export type SearchMoviesParams = {
  page?: number,
  query: string,
};
export const searchMovies = (params: SearchMoviesParams) => axios.get('/search/movie', { params });

export const getMovieDetails = (id: string) => axios.get(`/movie/${id}`);
