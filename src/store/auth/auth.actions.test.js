import authActions from './auth.actions';
import AuthActionTypes from './auth.types';

describe('Auth action creators', () => {
  describe('login action creator', () => {
    it('should create the login action', () => {
      const username = 'someUsername';
      const password = 'somePassword';
      const action = authActions.login({ username, password });
      expect(action.type).toBe(AuthActionTypes.LOGIN);
      expect(action.payload).toEqual({ username, password });
    });
  });

  describe('loginStart action creator', () => {
    it('should create the loginStart action', () => {
      const action = authActions.loginStart();
      expect(action.type).toBe(AuthActionTypes.LOGIN_START);
    });
  });

  describe('loginSuccess action creator', () => {
    it('should create the loginSuccess action', () => {
      const sessionId = 'someSessionId';
      const accountId = 'someAccountId';
      const action = authActions.loginSuccess(sessionId, accountId);
      expect(action.type).toBe(AuthActionTypes.LOGIN_SUCCESS);
      expect(action.payload).toEqual({ sessionId, accountId });
    });
  });

  describe('loginFailure action creator', () => {
    it('should create the loginFailure action', () => {
      const error = 'some error message';
      const action = authActions.loginFailure(error);
      expect(action.type).toBe(AuthActionTypes.LOGIN_FAILURE);
      expect(action.payload).toEqual({ error });
    });
  });

  describe('loginClear action creator', () => {
    it('should create the loginClear action', () => {
      const action = authActions.loginClear();
      expect(action.type).toBe(AuthActionTypes.LOGIN_CLEAR);
    });
  });

  describe('logout action creator', () => {
    it('should create the logout action', () => {
      const action = authActions.logout();
      expect(action.type).toBe(AuthActionTypes.LOGOUT);
    });
  });

  describe('logoutStart action creator', () => {
    it('should create the logoutStart action', () => {
      const action = authActions.logoutStart();
      expect(action.type).toBe(AuthActionTypes.LOGOUT_START);
    });
  });

  describe('logoutSuccess action creator', () => {
    it('should create the logoutSuccess action', () => {
      const action = authActions.logoutSuccess();
      expect(action.type).toBe(AuthActionTypes.LOGOUT_SUCCESS);
    });
  });

  describe('logoutFailure action creator', () => {
    it('should create the logoutFailure action', () => {
      const error = 'some error message';
      const action = authActions.logoutFailure(error);
      expect(action.type).toBe(AuthActionTypes.LOGOUT_FAILURE);
      expect(action.payload).toEqual({ error });
    });
  });

  describe('checkAuthState action creator', () => {
    it('should create the checkAuthState action', () => {
      const action = authActions.checkAuthState();
      expect(action.type).toBe(AuthActionTypes.CHECK_AUTH_STATE);
    });
  });
});
