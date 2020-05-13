import uiReducer, { initialState } from './ui.reducer';

describe('Ui reducer', () => {
  it('should return the initial state', () => {
    const state = uiReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });
});
