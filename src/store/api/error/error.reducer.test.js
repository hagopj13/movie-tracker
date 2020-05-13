import errorReducer, { initialState } from './error.reducer';

describe('Error reducer', () => {
  it('should return the initial state', () => {
    const state = errorReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });

  it('should set the error message for an action type when a FAILURE action occurs', () => {
    const actionType = 'SOME_ACTION_TYPE';
    const error = 'some error message';
    const action = { type: `${actionType}_FAILURE`, payload: { error } };
    const state = errorReducer(initialState, action);
    expect(state[actionType]).toBe(error);
  });

  it('should clear the error message for an action type when a START action occurs', () => {
    const actionType = 'SOME_ACTION_TYPE';
    const currentState = { [actionType]: 'some error message' };
    const action = { type: `${actionType}_START` };
    const state = errorReducer(currentState, action);
    expect(state[actionType]).toBe('');
  });

  it('should clear the error message for an action type when a SUCCESS action occurs', () => {
    const actionType = 'SOME_ACTION_TYPE';
    const currentState = { [actionType]: 'some error message' };
    const action = { type: `${actionType}_SUCCESS` };
    const state = errorReducer(currentState, action);
    expect(state[actionType]).toBe('');
  });

  it('should clear the error message for an action type when a CLEAR action occurs', () => {
    const actionType = 'SOME_ACTION_TYPE';
    const currentState = { [actionType]: 'some error message' };
    const action = { type: `${actionType}_CLEAR` };
    const state = errorReducer(currentState, action);
    expect(state[actionType]).toBe('');
  });
});
