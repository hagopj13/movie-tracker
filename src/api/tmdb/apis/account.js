// @flow
import axios from '../axiosInstance';

export const getAccountDetails = (sessionId: string) =>
  axios.get(`/account?session_id=${sessionId}`);

export type GetFavoriteMoviesParams = {
  sort_by: string,
  page?: number,
};
export const getFavoriteMovies = (
  sessionId: string,
  accountId: string,
  params: GetFavoriteMoviesParams,
) =>
  axios.get(`/account/${accountId}/favorite/movies`, {
    params: { ...params, session_id: sessionId },
  });

export type GetWatchlistMoviesParams = {
  sort_by: string,
  page?: number,
};
export const getWatchlistMovies = (
  sessionId: string,
  accountId: string,
  params: GetWatchlistMoviesParams,
) =>
  axios.get(`/account/${accountId}/watchlist/movies`, {
    params: { ...params, session_id: sessionId },
  });
