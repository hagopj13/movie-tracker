import loadedSelectors from './loaded.selectors';

describe('Loaded selectors', () => {
  describe('createIsLoadedSelector', () => {
    it('should create an is loaded selector that returns true if an action type is loaded', () => {
      const actionType = 'SOME_ACTION_TYPE';
      const currentState = {
        api: {
          loaded: {
            [actionType]: true,
          },
        },
      };
      const selectIsLoaded = loadedSelectors.createIsLoadedSelector([actionType]);
      expect(selectIsLoaded(currentState)).toBe(true);
    });

    it('should create an is loaded selector that returns false if an action type is not loaded', () => {
      const actionType = 'SOME_ACTION_TYPE';
      const currentState = {
        api: {
          loaded: {},
        },
      };
      const selectIsLoaded = loadedSelectors.createIsLoadedSelector([actionType]);
      expect(selectIsLoaded(currentState)).toBe(false);
    });

    it('should create an is loaded selector for multiple actions types that returns true if all are loaded', () => {
      const actionType1 = 'SOME_ACTION_TYPE1';
      const actionType2 = 'SOME_ACTION_TYPE2';
      const currentState = {
        api: {
          loaded: {
            [actionType1]: true,
            [actionType2]: true,
          },
        },
      };
      const selectIsLoaded = loadedSelectors.createIsLoadedSelector([actionType1, actionType2]);
      expect(selectIsLoaded(currentState)).toBe(true);
    });

    it('should create an is loaded selector for multiple actions types that returns false if at least one is not loaded', () => {
      const actionType1 = 'SOME_ACTION_TYPE1';
      const actionType2 = 'SOME_ACTION_TYPE2';
      const currentState = {
        api: {
          loaded: {
            [actionType1]: true,
          },
        },
      };
      const selectIsLoaded = loadedSelectors.createIsLoadedSelector([actionType1, actionType2]);
      expect(selectIsLoaded(currentState)).toBe(false);
    });
  });
});
