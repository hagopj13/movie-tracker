import { takeLatest, all, call, put, select } from 'redux-saga/effects';

import * as api from 'api/tmdb';
import authSelectors from 'store/auth/auth.selectors';

import ProfileActionTypes from './profile.types';
import profileActions from './profile.actions';

function* fetchProfile() {
  yield put(profileActions.fetchProfileStart());
  const sessionId = yield select(authSelectors.selectSessionId);
  try {
    const { data } = yield call(api.getAccountDetails(sessionId));
    yield put(profileActions.fetchProfileSuccess(data));
  } catch (error) {
    yield put(profileActions.fetchProfileFailure(error.status_message));
  }
}

function* onFetchProfile() {
  yield takeLatest(ProfileActionTypes.FETCH_PROFILE, fetchProfile);
}

export default function* configSagas() {
  yield all([call(onFetchProfile)]);
}
