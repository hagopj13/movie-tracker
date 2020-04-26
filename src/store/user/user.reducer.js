import { combineReducers } from 'redux';

import profileReducer from './profile/profile.reducer';
import favoritesReducer from './favorites/favorites.reducer';
import watchlistReducer from './watchlist/watchlist.reducer';

export default combineReducers({
  profile: profileReducer,
  favorites: favoritesReducer,
  watchlist: watchlistReducer,
});
