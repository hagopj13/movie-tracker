import loadingSelectors from './loading.selectors';

describe('Loading selectors', () => {
  describe('createIsLoadingSelector', () => {
    it('should create an is loading selector that returns true if an action type is loading', () => {
      const actionType = 'SOME_ACTION_TYPE';
      const currentState = {
        api: {
          loading: {
            [actionType]: true,
          },
        },
      };
      const selectIsLoading = loadingSelectors.createIsLoadingSelector([actionType]);
      expect(selectIsLoading(currentState)).toBe(true);
    });

    it('should create an is loading selector that returns false if an action type is not loading', () => {
      const actionType = 'SOME_ACTION_TYPE';
      const currentState = {
        api: {
          loading: {},
        },
      };
      const selectIsLoading = loadingSelectors.createIsLoadingSelector([actionType]);
      expect(selectIsLoading(currentState)).toBe(false);
    });

    it('should create an is loading selector for multiple actions types that returns false if all are not loading', () => {
      const actionType1 = 'SOME_ACTION_TYPE1';
      const actionType2 = 'SOME_ACTION_TYPE2';
      const currentState = {
        api: {
          loading: {},
        },
      };
      const selectIsLoading = loadingSelectors.createIsLoadingSelector([actionType1, actionType2]);
      expect(selectIsLoading(currentState)).toBe(false);
    });

    it('should create an is loading selector for multiple actions types that returns true if at least one is loading', () => {
      const actionType1 = 'SOME_ACTION_TYPE1';
      const actionType2 = 'SOME_ACTION_TYPE2';
      const currentState = {
        api: {
          loading: {
            [actionType1]: true,
          },
        },
      };
      const selectIsLoading = loadingSelectors.createIsLoadingSelector([actionType1, actionType2]);
      expect(selectIsLoading(currentState)).toBe(true);
    });
  });
});
