import loadedReducer, { initialState } from './loaded.reducer';

describe('Loaded reducer', () => {
  it('should return the initial state', () => {
    const state = loadedReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });

  it('should set loaded to true for an action type when a SUCCESS action occurs', () => {
    const actionType = 'SOME_ACTION_TYPE';
    const action = { type: `${actionType}_SUCCESS` };
    const state = loadedReducer(initialState, action);
    expect(state[actionType]).toBe(true);
  });
});
