import SearchActionTypes from 'store/search/search.types';

import searchReducer, { initialState } from './search.reducer';

describe('Seach reducer', () => {
  it('should return the initial state', () => {
    const state = searchReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });

  it('should set the search query on setSearchQuery action', () => {
    const query = 'someQuery';
    const action = {
      type: SearchActionTypes.SET_SEARCH_QUERY,
      payload: { query },
    };
    const state = searchReducer(initialState, action);
    expect(state.query).toBe(query);
  });
});
