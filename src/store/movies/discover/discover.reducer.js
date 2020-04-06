// @flow
import { convertResultsToMoviesList } from 'store/movies/movies.utils';

import DiscoverMoviesActionTypes from './discover.types';

const initialState = {
  list: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case DiscoverMoviesActionTypes.GET_DISCOVER_MOVIES_START:
      return {
        ...state,
        list: [],
      };
    case DiscoverMoviesActionTypes.GET_DISCOVER_MOVIES_SUCCESS:
      console.log(convertResultsToMoviesList(payload.data.results));
      return {
        ...state,
        list: convertResultsToMoviesList(payload.data.results),
      };
    default:
      return state;
  }
};
