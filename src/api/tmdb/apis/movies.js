// @flow
import axios from '../axiosInstance';

type GetDiscoverMoviesParams = {
  page?: number,
};
export const getDiscoverMovies = (params: GetDiscoverMoviesParams) =>
  axios.get('/discover/movie', { params });
