import authSelectors from './auth.selectors';

describe('Auth selectors', () => {
  describe('selectSessionId', () => {
    it('should return the sessionId', () => {
      const sessionId = 'someSessionId';
      const currentState = {
        auth: { sessionId },
      };
      const selectedSessionId = authSelectors.selectSessionId(currentState);
      expect(selectedSessionId).toBe(sessionId);
    });
  });

  describe('selectAccountId', () => {
    it('should return the accountId', () => {
      const accountId = 'someAccountId';
      const currentState = {
        auth: { accountId },
      };
      const selectedAccountId = authSelectors.selectAccountId(currentState);
      expect(selectedAccountId).toBe(accountId);
    });
  });

  describe('selectIsAuth', () => {
    it('should return true if sessionId is set', () => {
      const currentState = {
        auth: {
          sessionId: 'someSessionId',
        },
      };
      const selectedIsAuth = authSelectors.selectIsAuth(currentState);
      expect(selectedIsAuth).toBe(true);
    });

    it('should return false if sessionId is not set', () => {
      const currentState = {
        auth: {
          sessionId: null,
        },
      };
      const selectedIsAuth = authSelectors.selectIsAuth(currentState);
      expect(selectedIsAuth).toBe(false);
    });
  });
});
