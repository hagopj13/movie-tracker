// @flow
import { convertResultsToMoviesList } from 'store/movies/movies.utils';

import DiscoverMoviesActionTypes from './discover.types';

const initialState = {
  list: [],
  pagination: {},
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
    default:
      return state;
  }
};
