import upcomingReducer, { initialState } from './upcoming.reducer';

describe('Upcoming reducer', () => {
  it('should return the initial state', () => {
    const state = upcomingReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });
});
