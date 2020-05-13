import { defaultInitialState as moviesInitialState } from 'store/common/movies/movies.reducer';

import watchlistReducer from './watchlist.reducer';

describe('Watchlist reducer', () => {
  it('should return the initial state', () => {
    const state = watchlistReducer(undefined, { type: '@@INIT' });
    expect(state).toBeDefined();
    expect(state.movies).toEqual(moviesInitialState);
  });
});
