import { all, call } from 'redux-saga/effects';

import authSagas from './auth/auth.sagas';
import configSagas from './config/config.sagas';
import moviesSagas from './movies/movies.sagas';

export default function* rootSaga() {
  yield all([call(authSagas), call(configSagas), call(moviesSagas)]);
}
