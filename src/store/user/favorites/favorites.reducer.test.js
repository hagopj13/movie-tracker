import { defaultInitialState as moviesInitialState } from 'store/common/movies/movies.reducer';

import favoritesReducer from './favorites.reducer';

describe('Favorites reducer', () => {
  it('should return the initial state', () => {
    const state = favoritesReducer(undefined, { type: '@@INIT' });
    expect(state).toBeDefined();
    expect(state.movies).toEqual(moviesInitialState);
  });
});
