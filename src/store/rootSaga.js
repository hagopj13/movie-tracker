import { all, call } from 'redux-saga/effects';

import authSagas from './auth/auth.sagas';
import configSagas from './config/config.sagas';
import discoverSagas from './discover/discover.sagas';
import movieDetailsSagas from './movieDetails/movieDetails.sagas';
import searchSagas from './search/search.sagas';
import upcomingSagas from './upcoming/upcoming.sagas';

export default function* rootSaga() {
  yield all([
    call(authSagas),
    call(configSagas),
    call(discoverSagas),
    call(movieDetailsSagas),
    call(searchSagas),
    call(upcomingSagas),
  ]);
}
