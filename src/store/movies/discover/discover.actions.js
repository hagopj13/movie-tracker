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

export const getMoreDiscoverMovies = () => ({
  type: DiscoverMoviesActionTypes.GET_MORE_DISCOVER_MOVIES,
});

export const getMoreDiscoverMoviesStart = () => ({
  type: DiscoverMoviesActionTypes.GET_MORE_DISCOVER_MOVIES_START,
});

export const getMoreDiscoverMoviesSuccess = (data: any) => ({
  type: DiscoverMoviesActionTypes.GET_MORE_DISCOVER_MOVIES_SUCCESS,
  payload: { data },
});

export const getMoreDiscoverMoviesFailure = (error: string) => ({
  type: DiscoverMoviesActionTypes.GET_MORE_DISCOVER_MOVIES_FAILURE,
  payload: { error },
});

export const setSortBy = (sortBy: string) => ({
  type: DiscoverMoviesActionTypes.DISCOVER_MOVIES_SET_SORT_BY,
  payload: { sortBy },
});

export const toggleGenreFilter = (genre: number) => ({
  type: DiscoverMoviesActionTypes.DISCOVER_MOVIES_TOGGLE_GENRE_FILTER,
  payload: { genre },
});

export const removeGenreFromFilterList = (genre: number) => ({
  type: DiscoverMoviesActionTypes.DISCOVER_MOVIES_REMOVE_GENRE_FROM_FILTER_LIST,
  payload: { genre },
});

export const setReleaseYear = (releaseYear: number) => ({
  type: DiscoverMoviesActionTypes.DISCOVER_MOVIES_SET_RELEASE_YEAR,
  payload: { releaseYear },
});
