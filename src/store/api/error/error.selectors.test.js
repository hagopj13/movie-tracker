import errorSelectors from './error.selectors';

describe('Error selectors', () => {
  describe('createErrorSelector', () => {
    it('should create an error selector that returns the error message if an error is found for an action type', () => {
      const actionType = 'SOME_ACTION_TYPE';
      const error = 'some error message';
      const currentState = {
        api: {
          error: {
            [actionType]: error,
          },
        },
      };
      const selectError = errorSelectors.createErrorSelector([actionType]);
      expect(selectError(currentState)).toBe(error);
    });

    it('should create an error selector that returns an empty string if no error is found for an action type', () => {
      const actionType = 'SOME_ACTION_TYPE';
      const currentState = {
        api: {
          error: {},
        },
      };
      const selectError = errorSelectors.createErrorSelector([actionType]);
      expect(selectError(currentState)).toBe('');
    });

    it('should create an error selector that returns the first error it finds for multiple action types', () => {
      const actionType1 = 'SOME_ACTION_TYPE1';
      const actionType2 = 'SOME_ACTION_TYPE2';
      const error2 = 'some error message 2';
      const currentState = {
        api: {
          error: {
            [actionType2]: error2,
          },
        },
      };
      const selectError = errorSelectors.createErrorSelector([actionType1, actionType2]);
      expect(selectError(currentState)).toBe(error2);
    });
  });
});
