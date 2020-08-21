import { select } from 'redux-saga/effects';
import { testSaga, expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import dialogActions from 'store/ui/dialog/dialog.actions';
import dialogTypes from 'config/dialogTypes';
import * as api from 'api/tmdb';
import getRequestTokenResponse from 'api/tmdb/fixtures/getRequestTokenResponse';
import loginResponse from 'api/tmdb/fixtures/loginResponse';
import createSessionResponse from 'api/tmdb/fixtures/createSessionResponse';
import getAccountDetailsResponse from 'api/tmdb/fixtures/getAccountDetailsResponse';
import deleteSessionResponse from 'api/tmdb/fixtures/deleteSessionResponse';

import * as authSagas from './auth.sagas';
import authActions from './auth.actions';
import authSelectors from './auth.selectors';
import AuthActionTypes from './auth.types';

describe('Auth sagas', () => {
  describe('onLogin saga', () => {
    it('should trigger on LOGIN', () => {
      testSaga(authSagas.onLogin).next().takeLatest(AuthActionTypes.LOGIN, authSagas.login);
    });
  });

  describe('onLogout saga', () => {
    it('should trigger on LOGOUT', () => {
      testSaga(authSagas.onLogout).next().takeLatest(AuthActionTypes.LOGOUT, authSagas.logout);
    });
  });

  describe('onCheckAuthState saga', () => {
    it('should trigger on CHECK_AUTH_STATE', () => {
      testSaga(authSagas.onCheckAuthState)
        .next()
        .takeLatest(AuthActionTypes.CHECK_AUTH_STATE, authSagas.checkAuthState);
    });
  });

  describe('login saga', () => {
    beforeEach(() => {
      localStorage.setItem.mockClear();
    });

    it('should fire loginStart and then loginSuccess and hideDialog if credentials are correct', () => {
      const action = {
        payload: {
          username: 'someUsername',
          password: 'somePassword',
        },
      };

      expectSaga(authSagas.login, action)
        .provide([
          [matchers.call.fn(api.getRequestToken), { data: getRequestTokenResponse }],
          [matchers.call.fn(api.login), { data: loginResponse }],
          [matchers.call.fn(api.createSession), { data: createSessionResponse }],
          [matchers.call.fn(api.getAccountDetails), { data: getAccountDetailsResponse }],
        ])
        .put(authActions.loginStart())
        .put(
          authActions.loginSuccess(createSessionResponse.session_id, getAccountDetailsResponse.id),
        )
        .put(dialogActions.hideDialog(dialogTypes.LOGIN))
        .run();

      expect(localStorage.setItem).toHaveBeenCalledTimes(2);
      expect(localStorage.setItem).toHaveBeenNthCalledWith(
        1,
        'sessionId',
        createSessionResponse.session_id,
      );
      expect(localStorage.setItem).toHaveBeenNthCalledWith(
        2,
        'accountId',
        getAccountDetailsResponse.id,
      );
    });

    it('should fire loginStart and then loginFailure if credentials are incorrect or something fails', () => {
      const action = {
        payload: {
          username: 'someUsername',
          password: 'someWrongPassword',
        },
      };

      expectSaga(authSagas.login, action)
        .provide([
          [matchers.call.fn(api.getRequestToken), { data: getRequestTokenResponse }],
          [matchers.call.fn(api.login), throwError()],
        ])
        .put(authActions.loginStart())
        .put(authActions.loginFailure('Incorrect username or password'))
        .run();

      expect(localStorage.setItem).not.toHaveBeenCalled();
    });
  });

  describe('logout saga', () => {
    beforeEach(() => {
      localStorage.removeItem.mockClear();
    });

    it('should fire logoutStart and then logoutSuccess if no errors are thrown', () => {
      expectSaga(authSagas.logout)
        .provide([
          [select(authSelectors.selectSessionId), 'someSessionId'],
          [matchers.call.fn(api.deleteSession), { data: deleteSessionResponse }],
        ])
        .put(authActions.logoutStart())
        .put(authActions.logoutSuccess())
        .run();

      expect(localStorage.removeItem).toHaveBeenCalledTimes(2);
      expect(localStorage.removeItem).toHaveBeenNthCalledWith(1, 'sessionId');
      expect(localStorage.removeItem).toHaveBeenNthCalledWith(2, 'accountId');
    });

    it('should fire logoutStart and then logoutFailure if an error is thrown', () => {
      const error = 'someErrorMessage';

      expectSaga(authSagas.logout)
        .provide([
          [select(authSelectors.selectSessionId), 'someSessionId'],
          [matchers.call.fn(api.deleteSession), throwError({ status_message: error })],
        ])
        .put(authActions.logoutStart())
        .put(authActions.logoutFailure(error))
        .run();

      expect(localStorage.removeItem).not.toHaveBeenCalled();
    });
  });

  describe('checkAuthState saga', () => {
    beforeEach(() => {
      localStorage.getItem.mockClear();
    });

    it('should fire loginSuccess if sessionId and accountId are present', () => {
      const sessionId = 'someSessionId';
      const accountId = 'someAccountId';
      localStorage.getItem.mockImplementation((key) => {
        if (key === 'sessionId') {
          return sessionId;
        }
        if (key === 'accountId') {
          return accountId;
        }
        return null;
      });

      expectSaga(authSagas.checkAuthState)
        .put(authActions.loginSuccess(sessionId, accountId))
        .run();
    });

    it('should fire logoutSuccess if sessionId is missing', () => {
      const accountId = 'someAccountId';
      localStorage.getItem.mockImplementation((key) => {
        if (key === 'accountId') {
          return accountId;
        }
        return null;
      });

      expectSaga(authSagas.checkAuthState).put(authActions.logoutSuccess()).run();
    });

    it('should fire logoutSuccess if accountId is missing', () => {
      const sessionId = 'someSessionId';
      localStorage.getItem.mockImplementation((key) => {
        if (key === 'sessionId') {
          return sessionId;
        }
        return null;
      });

      expectSaga(authSagas.checkAuthState).put(authActions.logoutSuccess()).run();
    });
  });
});
