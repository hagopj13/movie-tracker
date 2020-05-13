import userReducer, { initialState } from './user.reducer';

describe('User reducer', () => {
  it('should return the initial state', () => {
    const state = userReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });
});
