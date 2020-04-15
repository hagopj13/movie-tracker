// @flow
import type { Moment } from 'moment';

import typeGenerator from 'store/common/utils/typeGenerator';
import actionCreatorGenerator from 'store/common/utils/actionCreatorGenerator';

import FiltersActionTypes from './filters.types';

const setSortBy = (namespace) => (sortBy: string) => ({
  type: typeGenerator(namespace, FiltersActionTypes.SET_SORT_BY),
  payload: { sortBy },
});

const toggleGenre = (namespace) => (genreId: number) => ({
  type: typeGenerator(namespace, FiltersActionTypes.TOGGLE_GENRE),
  payload: { genreId },
});

const setReleaseDateStart = (namespace) => (releaseDateStart: Moment) => ({
  type: typeGenerator(namespace, FiltersActionTypes.SET_RELEASE_DATE_START),
  payload: { releaseDateStart },
});

const setReleaseDateEnd = (namespace) => (releaseDateEnd: Moment) => ({
  type: typeGenerator(namespace, FiltersActionTypes.SET_RELEASE_DATE_END),
  payload: { releaseDateEnd },
});

type Action = {
  type: string,
  payload?: any,
};

type FiltersActionCreators = {
  setSortBy: (sortBy: string) => Action,
  toggleGenre: (genreId: number) => Action,
  setReleaseDateStart: (releaseDateStart: Moment) => Action,
  setReleaseDateEnd: (releaseDateEnd: Moment) => Action,
};

export default (namespace: string): FiltersActionCreators =>
  actionCreatorGenerator<FiltersActionCreators>(namespace, {
    setSortBy,
    toggleGenre,
    setReleaseDateStart,
    setReleaseDateEnd,
  });
