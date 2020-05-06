import apiReducer from 'store/api/api.reducer';
import { initialState as errorInitialState } from 'store/api/error/error.reducer';
import { initialState as loadedInitialState } from 'store/api/loaded/loaded.reducer';
import { initialState as loadingInitialState } from 'store/api/loading/loading.reducer';

describe('Api reducer', () => {
  it('should return the initial state', () => {
    const state = apiReducer(undefined, { type: '@@INIT' });
    expect(state).toBeDefined();
    expect(state.error).toEqual(errorInitialState);
    expect(state.loaded).toEqual(loadedInitialState);
    expect(state.loading).toEqual(loadingInitialState);
  });
});
