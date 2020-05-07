import upcomingReducer, { initialState } from 'store/upcoming/upcoming.reducer';

describe('Upcoming reducer', () => {
  it('should return the initial state', () => {
    const state = upcomingReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });
});
