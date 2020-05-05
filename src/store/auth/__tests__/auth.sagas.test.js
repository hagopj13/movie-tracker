import { select } from 'redux-saga/effects';
import { testSaga, expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import * as authSagas from 'store/auth/auth.sagas';
import authActions from 'store/auth/auth.actions';
import authSelectors from 'store/auth/auth.selectors';
import AuthActionTypes from 'store/auth/auth.types';
import dialogActions from 'store/ui/dialog/dialog.actions';
import { dialogTypes } from 'config';
import LocalStorageService from 'services/LocalStorageService';
import * as api from 'api/tmdb';
import getRequestTokenResponse from 'api/tmdb/fixtures/getRequestTokenResponse';
import loginResponse from 'api/tmdb/fixtures/loginResponse';
import createSessionResponse from 'api/tmdb/fixtures/createSessionResponse';
import getAccountDetailsResponse from 'api/tmdb/fixtures/getAccountDetailsResponse';
import deleteSessionResponse from 'api/tmdb/fixtures/deleteSessionResponse';

jest.mock('services/LocalStorageService');

describe('Auth sagas', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

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
    it('should fire loginStart and then loginSuccess and hideDialog if credentials are correct', () => {
      const setItemSpy = jest.spyOn(LocalStorageService, 'setItem');
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

      expect(setItemSpy).toHaveBeenCalledTimes(2);
      expect(setItemSpy).toHaveBeenNthCalledWith(1, 'sessionId', createSessionResponse.session_id);
      expect(setItemSpy).toHaveBeenNthCalledWith(2, 'accountId', getAccountDetailsResponse.id);
    });

    it('should fire loginStart and then loginFailure if credentials are incorrect or something fails', () => {
      const setItemSpy = jest.spyOn(LocalStorageService, 'setItem');
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

      expect(setItemSpy).not.toHaveBeenCalled();
    });
  });

  describe('logout saga', () => {
    it('should fire logoutStart and then logoutSuccess if no errors are thrown', () => {
      const removeItemSpy = jest.spyOn(LocalStorageService, 'removeItem');

      expectSaga(authSagas.logout)
        .provide([
          [select(authSelectors.selectSessionId), 'someSessionId'],
          [matchers.call.fn(api.deleteSession), { data: deleteSessionResponse }],
        ])
        .put(authActions.logoutStart())
        .put(authActions.logoutSuccess())
        .run();

      expect(removeItemSpy).toHaveBeenCalledTimes(2);
      expect(removeItemSpy).toHaveBeenNthCalledWith(1, 'sessionId');
      expect(removeItemSpy).toHaveBeenNthCalledWith(2, 'accountId');
    });

    it('should fire logoutStart and then logoutFailure if an error is thrown', () => {
      const removeItemSpy = jest.spyOn(LocalStorageService, 'removeItem');
      const error = 'someErrorMessage';

      expectSaga(authSagas.logout)
        .provide([
          [select(authSelectors.selectSessionId), 'someSessionId'],
          [matchers.call.fn(api.deleteSession), throwError({ status_message: error })],
        ])
        .put(authActions.logoutStart())
        .put(authActions.logoutFailure(error))
        .run();

      expect(removeItemSpy).not.toHaveBeenCalled();
    });
  });

  describe('checkAuthState saga', () => {
    it('should fire loginSuccess if sessionId and accountId are present', () => {
      const sessionId = 'someSessionId';
      const accountId = 'someAccountId';
      const getItemSpy = jest.spyOn(LocalStorageService, 'getItem');
      getItemSpy.mockImplementation((key) => {
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
      const getItemSpy = jest.spyOn(LocalStorageService, 'getItem');
      getItemSpy.mockImplementation((key) => {
        if (key === 'accountId') {
          return accountId;
        }
        return null;
      });

      expectSaga(authSagas.checkAuthState).put(authActions.logoutSuccess()).run();
    });

    it('should fire logoutSuccess if accountId is missing', () => {
      const sessionId = 'someSessionId';
      const getItemSpy = jest.spyOn(LocalStorageService, 'getItem');
      getItemSpy.mockImplementation((key) => {
        if (key === 'sessionId') {
          return sessionId;
        }
        return null;
      });

      expectSaga(authSagas.checkAuthState).put(authActions.logoutSuccess()).run();
    });
  });
});
