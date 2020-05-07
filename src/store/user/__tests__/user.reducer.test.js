import userReducer from 'store/user/user.reducer';
import { initialState as profileInitialState } from 'store/user/profile/profile.reducer';
import { initialState as favoritesInitialState } from 'store/user/favorites/favorites.reducer';
import { initialState as watchlistInitialState } from 'store/user/watchlist/watchlist.reducer';

describe('User reducer', () => {
  it('should return the initial state', () => {
    const state = userReducer(undefined, { type: '@@INIT' });
    expect(state).toBeDefined();
    expect(state.profile).toEqual(profileInitialState);
    expect(state.favorites).toEqual(favoritesInitialState);
    expect(state.watchlist).toEqual(watchlistInitialState);
  });
});
