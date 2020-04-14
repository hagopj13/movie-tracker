// @flow
import { handleActions } from 'redux-actions';

import AuthActionTypes from './auth.types';

type State = {
  sessionId: string | null,
};

const initialState: State = {
  sessionId: null,
};

const loginSuccess = (state: State, action: any) => ({
  ...state,
  sessionId: action.payload.sessionId,
});

const logoutSuccess = (state: State) => ({
  ...state,
  sessionId: null,
});

const actionHandler = {
  [AuthActionTypes.LOGIN_SUCCESS]: loginSuccess,
  [AuthActionTypes.LOGOUT_SUCCESS]: logoutSuccess,
};

export default handleActions(actionHandler, initialState);
