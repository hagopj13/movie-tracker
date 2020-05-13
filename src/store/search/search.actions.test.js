import searchActions from './search.actions';
import SearchActionTypes from './search.types';

describe('Sialog action creators', () => {
  describe('setSearchQuery action creator', () => {
    it('should create the setSearchQuery action', () => {
      const query = 'someQuery';
      const action = searchActions.setSearchQuery(query);
      expect(action.type).toBe(SearchActionTypes.SET_SEARCH_QUERY);
      expect(action.payload).toEqual({ query });
    });
  });
});
