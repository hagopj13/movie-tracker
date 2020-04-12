// @flow
import { convertResultsToMoviesList } from 'store/movies/movies.utils';

import DiscoverMoviesActionTypes from './discover.types';

const initialState = {
  list: [],
  pagination: {},
  filters: {
    sortBy: 'popularity.desc',
    genres: [],
    releaseYear: null,
  },
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case DiscoverMoviesActionTypes.GET_DISCOVER_MOVIES_START:
      return {
        ...state,
        list: [],
        pagination: {},
      };
    case DiscoverMoviesActionTypes.GET_DISCOVER_MOVIES_SUCCESS:
      return {
        ...state,
        list: convertResultsToMoviesList(payload.data.results),
        pagination: {
          ...state.pagination,
          page: payload.data.page,
          totalPages: payload.data.total_pages,
        },
      };
    case DiscoverMoviesActionTypes.GET_MORE_DISCOVER_MOVIES_SUCCESS:
      return {
        ...state,
        list: state.list.concat(convertResultsToMoviesList(payload.data.results)),
        pagination: {
          ...state.pagination,
          page: payload.data.page,
        },
      };
    case DiscoverMoviesActionTypes.DISCOVER_MOVIES_SET_SORT_BY:
      return {
        ...state,
        filters: {
          ...state.filters,
          sortBy: payload.sortBy,
        },
      };
    case DiscoverMoviesActionTypes.DISCOVER_MOVIES_ADD_GENRE_TO_FILTER_LIST:
      return {
        ...state,
        filters: {
          ...state.filters,
          genres: state.filters.genres.push(payload.genre),
        },
      };
    case DiscoverMoviesActionTypes.DISCOVER_MOVIES_REMOVE_GENRE_FROM_FILTER_LIST:
      return {
        ...state,
        filters: {
          ...state.filters,
          genres: state.filters.genres.filter((genreId) => genreId !== payload.genre),
        },
      };
    case DiscoverMoviesActionTypes.DISCOVER_MOVIES_SET_RELEASE_YEAR:
      return {
        ...state,
        filters: {
          ...state.filters,
          releaseYear: payload.releaseYear,
        },
      };
    default:
      return state;
  }
};
