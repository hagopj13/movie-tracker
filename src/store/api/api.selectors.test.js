import apiSelectors from './api.selectors';

describe('Api selectors', () => {
  describe('selectApi', () => {
    it('should return api state', () => {
      const apiState = {
        loading: { FETCH_MOVIES: true },
      };
      const currentState = { api: apiState };
      const selectedApiState = apiSelectors.selectApi(currentState);
      expect(selectedApiState).toEqual(apiState);
    });
  });
});
