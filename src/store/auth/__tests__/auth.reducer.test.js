import authReducer from 'store/auth/auth.reducer';
import AuthActionTypes from 'store/auth/auth.types';

const initialState = {
  sessionId: null,
  accountId: null,
};

describe('Auth reducer', () => {
  it('should return the initial state', () => {
    const state = authReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });

  it('should set sessionId and accountId on loginSuccess action', () => {
    const sessionId = 'someSessionId';
    const accountId = 'someAccountId';
    const action = {
      type: AuthActionTypes.LOGIN_SUCCESS,
      payload: { sessionId, accountId },
    };
    const state = authReducer(initialState, action);
    expect(state).toEqual({ sessionId, accountId });
  });

  it('should reset sessionId and accountId on logoutSuccess action', () => {
    const action = {
      type: AuthActionTypes.LOGOUT_SUCCESS,
    };
    const currentState = {
      sessionId: 'someSessionId',
      accountId: 'someAccountId',
    };
    const state = authReducer(currentState, action);
    expect(state).toEqual({ sessionId: null, accountId: null });
  });
});
