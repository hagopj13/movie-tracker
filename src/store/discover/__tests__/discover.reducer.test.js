import discoverReducer from 'store/discover/discover.reducer';
import { defaultInitialState as moviesInitialState } from 'store/common/movies/movies.reducer';
import { defaultInitialState as filtersInitialState } from 'store/common/filters/filters.reducer';

describe('Discover reducer', () => {
  it('should return the initial state', () => {
    const state = discoverReducer(undefined, { type: '@@INIT' });
    expect(state).toBeDefined();
    expect(state.movies).toEqual(moviesInitialState);
    expect(state.filters).toEqual(filtersInitialState);
  });
});
