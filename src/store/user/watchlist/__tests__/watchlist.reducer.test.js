import watchlistReducer from 'store/user/watchlist/watchlist.reducer';
import { defaultInitialState as moviesInitialState } from 'store/common/movies/movies.reducer';

describe('Watchlist reducer', () => {
  it('should return the initial state', () => {
    const state = watchlistReducer(undefined, { type: '@@INIT' });
    expect(state).toBeDefined();
    expect(state.movies).toEqual(moviesInitialState);
  });
});
