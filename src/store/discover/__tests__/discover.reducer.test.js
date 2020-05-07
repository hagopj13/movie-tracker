import discoverReducer, { initialState } from 'store/discover/discover.reducer';

describe('Discover reducer', () => {
  it('should return the initial state', () => {
    const state = discoverReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });
});
