import { all, call } from 'redux-saga/effects';

import authSagas from './auth/auth.sagas';
import configSagas from './config/config.sagas';
import discoverSagas from './discover/discover.sagas';
import upcomingSagas from './upcoming/upcoming.sagas';

export default function* rootSaga() {
  yield all([call(authSagas), call(configSagas), call(discoverSagas), call(upcomingSagas)]);
}
