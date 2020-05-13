import moment from 'moment';

import typeGenerator from 'store/common/utils/typeGenerator';

import filtersActionsGenerator from './filters.actions';
import FiltersActionTypes from './filters.types';

const namespace = 'someNamespace';
const filtersActions = filtersActionsGenerator(namespace);

describe('Filters action creators', () => {
  describe('setSortBy action creator', () => {
    it('should create the setSortBy action', () => {
      const sortBy = 'someSortBy';
      const action = filtersActions.setSortBy(sortBy);
      expect(action.type).toBe(typeGenerator(namespace, FiltersActionTypes.SET_SORT_BY));
      expect(action.payload).toEqual({ sortBy });
    });
  });

  describe('toggleGenre action creator', () => {
    it('should create the toggleGenre action', () => {
      const genreId = 123;
      const action = filtersActions.toggleGenre(genreId);
      expect(action.type).toBe(typeGenerator(namespace, FiltersActionTypes.TOGGLE_GENRE));
      expect(action.payload).toEqual({ genreId });
    });
  });

  describe('setReleaseDateStart action creator', () => {
    it('should create the setReleaseDateStart action', () => {
      const releaseDateStart = moment();
      const action = filtersActions.setReleaseDateStart(releaseDateStart);
      expect(action.type).toBe(typeGenerator(namespace, FiltersActionTypes.SET_RELEASE_DATE_START));
      expect(action.payload).toEqual({ releaseDateStart });
    });
  });

  describe('setReleaseDateEnd action creator', () => {
    it('should create the setReleaseDateEnd action', () => {
      const releaseDateEnd = moment();
      const action = filtersActions.setReleaseDateEnd(releaseDateEnd);
      expect(action.type).toBe(typeGenerator(namespace, FiltersActionTypes.SET_RELEASE_DATE_END));
      expect(action.payload).toEqual({ releaseDateEnd });
    });
  });
});
