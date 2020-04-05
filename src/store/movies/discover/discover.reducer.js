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
      return {
        ...state,
        list: payload.data.results,
      };
    default:
      return state;
  }
};
