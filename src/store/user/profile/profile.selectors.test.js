import profileSelectors from './profile.selectors';

describe('Profile selectors', () => {
  describe('selectUserName', () => {
    it('should return the user name', () => {
      const name = 'someName';
      const currentState = {
        user: {
          profile: { name },
        },
      };
      const selectedUserName = profileSelectors.selectUserName(currentState);
      expect(selectedUserName).toBe(name);
    });
  });
});
