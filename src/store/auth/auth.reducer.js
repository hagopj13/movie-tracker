// @flow
import { handleActions } from 'redux-actions';

import AuthActionTypes from './auth.types';

type State = {
  sessionId: string | null,
  accountId: string | null,
  isLoading: boolean,
};

const initialState: State = {
  sessionId: null,
  accountId: null,
  isLoading: true,
};

const loginSuccess = (state: State, action: any) => ({
  ...state,
  sessionId: action.payload.sessionId,
  accountId: action.payload.accountId,
  isLoading: false,
});

const logoutSuccess = () => ({
  ...initialState,
  isLoading: false,
});

const actionHandler = {
  [AuthActionTypes.LOGIN_SUCCESS]: loginSuccess,
  [AuthActionTypes.LOGOUT_SUCCESS]: logoutSuccess,
};

export default handleActions(actionHandler, initialState);
