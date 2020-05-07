import { combineReducers } from 'redux';

import profileReducer, { initialState as profileInitialState } from './profile/profile.reducer';
import favoritesReducer, {
  initialState as favoritesInitialState,
} from './favorites/favorites.reducer';
import watchlistReducer, {
  initialState as watchlistInitialState,
} from './watchlist/watchlist.reducer';

export const initialState = {
  profile: profileInitialState,
  favorites: favoritesInitialState,
  watchlist: watchlistInitialState,
};

export default combineReducers({
  profile: profileReducer,
  favorites: favoritesReducer,
  watchlist: watchlistReducer,
});
