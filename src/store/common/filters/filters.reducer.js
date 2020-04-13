// @flow
import reducerGenerator from 'store/common/utils/reducerGenerator';

import FiltersActionTypes from './filters.types';

const defaultInitialState = {
  sortBy: 'popularity.desc',
  genres: [],
  releaseDateStart: null,
  releaseDateEnd: null,
};

const setSortBy = (state, action) => ({
  ...state,
  sortBy: action.payload.sortBy,
});

const toggleGenre = (state, action) => ({
  ...state,
  genres: state.genres.includes(action.payload.genre)
    ? state.genres.filter((genre) => genre !== action.payload.genre)
    : state.genres.concat(action.payload.genre),
});

const setReleaseDateStart = (state, action) => ({
  ...state,
  releaseDateStart: action.payload.releaseDateStart,
});

const setReleaseDateEnd = (state, action) => ({
  ...state,
  releaseDateEnd: action.payload.releaseDateEnd,
});

const filtersActionHandler = {
  [FiltersActionTypes.SET_SORT_BY]: setSortBy,
  [FiltersActionTypes.TOGGLE_GENRE]: toggleGenre,
  [FiltersActionTypes.SET_RELEASE_DATE_START]: setReleaseDateStart,
  [FiltersActionTypes.SET_RELEASE_DATE_END]: setReleaseDateEnd,
};

export default (namespace: string, initialState?: any) =>
  reducerGenerator(namespace, filtersActionHandler, initialState ?? defaultInitialState);
