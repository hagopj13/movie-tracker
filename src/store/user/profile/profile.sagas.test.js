import { select } from 'redux-saga/effects';
import { testSaga, expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import authSelectors from 'store/auth/auth.selectors';
import * as api from 'api/tmdb';
import getAccountDetailsResponse from 'api/tmdb/fixtures/getAccountDetailsResponse';
import { convertResponseToProfile } from 'api/tmdb/utils';

import * as profileSagas from './profile.sagas';
import profileActions from './profile.actions';
import ProfileActionTypes from './profile.types';

describe('Profle sagas', () => {
  describe('onFetchProfile saga', () => {
    it('should trigger on FETCH_PROFILE', () => {
      testSaga(profileSagas.onFetchProfile)
        .next()
        .takeLatest(ProfileActionTypes.FETCH_PROFILE, profileSagas.fetchProfile);
    });
  });

  describe('fetchProfile saga', () => {
    it('should fire fetchProfileStart and then fetchProfileSuccess if no errors are thrown', () => {
      expectSaga(profileSagas.fetchProfile)
        .provide([
          [select(authSelectors.selectSessionId), 'someSessionId'],
          [matchers.call.fn(api.getAccountDetails), { data: getAccountDetailsResponse }],
        ])
        .put(profileActions.fetchProfileStart())
        .put(
          profileActions.fetchProfileSuccess(convertResponseToProfile(getAccountDetailsResponse)),
        )
        .run();
    });

    it('should fire fetchProfileStart and then fetchProfileFailure if error is thrown', () => {
      const errorMessage = 'some error message';
      expectSaga(profileSagas.fetchProfile)
        .provide([
          [select(authSelectors.selectSessionId), 'someSessionId'],
          [matchers.call.fn(api.getAccountDetails), throwError({ status_message: errorMessage })],
        ])
        .put(profileActions.fetchProfileStart())
        .put(profileActions.fetchProfileFailure(errorMessage))
        .run();
    });
  });
});
