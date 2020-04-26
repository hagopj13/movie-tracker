// @flow
import axios from '../axiosInstance';

export const getAccountDetails = (sessionId: string) =>
  axios.get(`/account?session_id=${sessionId}`);

export type GetFavoriteMoviesParams = {
  sortBy: string,
  page?: number,
};
export const getFavoriteMovies = (
  sessionId: string,
  accountId: string,
  params: GetFavoriteMoviesParams,
) => axios.get(`/account/${accountId}/favorite/movies`, { params });

export type GetWatchlistMoviesParams = {
  sortBy: string,
  page?: number,
};
export const getWatchlistMovies = (
  sessionId: string,
  accountId: string,
  params: GetWatchlistMoviesParams,
) => axios.get(`/account/${accountId}/watchlist/movies`, { params });
