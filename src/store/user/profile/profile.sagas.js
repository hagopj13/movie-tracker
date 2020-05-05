import { takeLatest, all, call, put, select } from 'redux-saga/effects';

import authSelectors from 'store/auth/auth.selectors';
import * as api from 'api/tmdb';
import { convertResponseToProfile } from 'api/tmdb/utils';

import ProfileActionTypes from './profile.types';
import profileActions from './profile.actions';

export function* fetchProfile() {
  yield put(profileActions.fetchProfileStart());
  const sessionId = yield select(authSelectors.selectSessionId);
  try {
    const { data } = yield call(api.getAccountDetails, sessionId);
    const profile = yield call(convertResponseToProfile, data);
    yield put(profileActions.fetchProfileSuccess(profile));
  } catch (error) {
    yield put(profileActions.fetchProfileFailure(error.status_message));
  }
}

export function* onFetchProfile() {
  yield takeLatest(ProfileActionTypes.FETCH_PROFILE, fetchProfile);
}

export default function* configSagas() {
  yield all([call(onFetchProfile)]);
}
