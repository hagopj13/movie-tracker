import searchActions from 'store/search/search.actions';
import SearchActionTypes from 'store/search/search.types';

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
