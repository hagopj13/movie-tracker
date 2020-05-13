import discoverReducer, { initialState } from './discover.reducer';

describe('Discover reducer', () => {
  it('should return the initial state', () => {
    const state = discoverReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });
});
