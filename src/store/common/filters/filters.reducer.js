// @flow
import type { Moment } from 'moment';

import reducerGenerator from 'store/common/utils/reducerGenerator';
import sortOptions from 'config/sortOptions';

import FiltersActionTypes from './filters.types';

export type State = {
  sortBy: string,
  genres: number[],
  releaseDateStart: Moment,
  releaseDateEnd: Moment,
};

export const defaultInitialState: State = {
  sortBy: sortOptions[0].value,
  genres: [],
  releaseDateStart: null,
  releaseDateEnd: null,
};

const setSortBy = (state: State, action) => ({
  ...state,
  sortBy: action.payload.sortBy,
});

const toggleGenre = (state: State, action) => ({
  ...state,
  genres: state.genres.includes(action.payload.genreId)
    ? state.genres.filter((genre) => genre !== action.payload.genreId)
    : state.genres.concat(action.payload.genreId),
});

const setReleaseDateStart = (state: State, action) => ({
  ...state,
  releaseDateStart: action.payload.releaseDateStart,
});

const setReleaseDateEnd = (state: State, action) => ({
  ...state,
  releaseDateEnd: action.payload.releaseDateEnd,
});

const filtersActionHandler = {
  [FiltersActionTypes.SET_SORT_BY]: setSortBy,
  [FiltersActionTypes.TOGGLE_GENRE]: toggleGenre,
  [FiltersActionTypes.SET_RELEASE_DATE_START]: setReleaseDateStart,
  [FiltersActionTypes.SET_RELEASE_DATE_END]: setReleaseDateEnd,
};

export default (namespace: string, initialState?: State) =>
  reducerGenerator(namespace, filtersActionHandler, initialState ?? defaultInitialState);
