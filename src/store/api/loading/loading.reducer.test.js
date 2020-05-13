import loadingReducer, { initialState } from './loading.reducer';

describe('Loading reducer', () => {
  it('should return the initial state', () => {
    const state = loadingReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });

  it('should set loading to true for an action type when a START action occurs', () => {
    const actionType = 'SOME_ACTION_TYPE';
    const action = { type: `${actionType}_START` };
    const state = loadingReducer(initialState, action);
    expect(state[actionType]).toBe(true);
  });

  it('should set loading to false for an action type when a SUCCESS action occurs', () => {
    const actionType = 'SOME_ACTION_TYPE';
    const currentState = { [actionType]: true };
    const action = { type: `${actionType}_SUCCESS` };
    const state = loadingReducer(currentState, action);
    expect(state[actionType]).toBe(false);
  });

  it('should set loading to false for an action type when a FAILURE action occurs', () => {
    const actionType = 'SOME_ACTION_TYPE';
    const currentState = { [actionType]: true };
    const action = { type: `${actionType}_FAILURE` };
    const state = loadingReducer(currentState, action);
    expect(state[actionType]).toBe(false);
  });
});
