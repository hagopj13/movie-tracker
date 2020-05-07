import favoritesReducer from 'store/user/favorites/favorites.reducer';
import { defaultInitialState as moviesInitialState } from 'store/common/movies/movies.reducer';

describe('Favorites reducer', () => {
  it('should return the initial state', () => {
    const state = favoritesReducer(undefined, { type: '@@INIT' });
    expect(state).toBeDefined();
    expect(state.movies).toEqual(moviesInitialState);
  });
});
