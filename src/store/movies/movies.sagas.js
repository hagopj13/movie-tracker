import { all, call } from 'redux-saga/effects';

import discoverMoviesSagas from './discover/discover.sagas';

export default function* rootSaga() {
  yield all([call(discoverMoviesSagas)]);
}
