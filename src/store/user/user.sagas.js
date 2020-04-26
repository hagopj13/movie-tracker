import { all, call } from 'redux-saga/effects';

import profileSagas from './profile/profile.sagas';
import favoritesSagas from './favorites/favorites.sagas';
import watchlistSagas from './watchlist/watchlist.sagas';

export default function* userSagas() {
  yield all([call(profileSagas), call(favoritesSagas), call(watchlistSagas)]);
}
