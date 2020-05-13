import userSelectors from './user.selectors';

describe('User selectors', () => {
  describe('selectUser', () => {
    it('should return user state', () => {
      const userState = {
        profile: { id: 'someId' },
      };
      const currentState = { user: userState };
      const selectedUserState = userSelectors.selectUser(currentState);
      expect(selectedUserState).toEqual(userState);
    });
  });
});
