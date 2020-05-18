import rootReducer, { initialState } from './rootReducer';

describe('Root reducer', () => {
  it('should return the initial state', () => {
    const state = rootReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });
});
