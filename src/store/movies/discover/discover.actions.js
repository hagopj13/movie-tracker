import DiscoverMoviesActionTypes from './discover.types';

export const getDiscoverMovies = () => ({
  type: DiscoverMoviesActionTypes.GET_DISCOVER_MOVIES,
});

export const getDiscoverMoviesStart = () => ({
  type: DiscoverMoviesActionTypes.GET_DISCOVER_MOVIES_START,
});

export const getDiscoverMoviesSuccess = (data: any) => ({
  type: DiscoverMoviesActionTypes.GET_DISCOVER_MOVIES_SUCCESS,
  payload: { data },
});

export const getDiscoverMoviesFailure = (error: string) => ({
  type: DiscoverMoviesActionTypes.GET_DISCOVER_MOVIES_FAILURE,
  payload: { error },
});
