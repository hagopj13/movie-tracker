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

export const getMovieDetails = (id: string, sessionId?: string) =>
  axios.get(`/movie/${id}`, {
    params: {
      session_id: sessionId,
      append_to_response: 'credits,keywords,reviews,recommendations,account_states',
    },
  });

export const getMovieUserState = (id: string, sessionId: string) =>
  axios.get(`/movie/${id}/account_states?session_id=${sessionId}`);

export const setIsMovieFavorite = (
  id: string,
  isFavorite: boolean,
  sessionId: string,
  accountId: string,
) =>
  axios.post(`/account/${accountId}/favorite?session_id=${sessionId}`, {
    media_type: 'movie',
    media_id: id,
    favorite: isFavorite,
  });

export const setIsMovieInWatchlist = (
  id: string,
  isInWatchlist: boolean,
  sessionId: string,
  accountId: string,
) =>
  axios.post(`/account/${accountId}/watchlist?session_id=${sessionId}`, {
    media_type: 'movie',
    media_id: id,
    watchlist: isInWatchlist,
  });

export const rateMovie = (id: string, rating: number, sessionId: string) =>
  axios.post(`/movie/${id}/rating?session_id=${sessionId}`, { value: rating });

export const deleteMovieRating = (id: string, sessionId: string) =>
  axios.delete(`/movie/${id}/rating?session_id=${sessionId}`);
