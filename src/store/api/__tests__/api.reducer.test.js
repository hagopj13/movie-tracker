import apiReducer, { initialState } from 'store/api/api.reducer';

describe('Api reducer', () => {
  it('should return the initial state', () => {
    const state = apiReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });
});
