// @flow
import AuthActionTypes from './auth.types';

type State = {
  sessionId: string | null,
};

const initialState: State = {
  sessionId: null,
};

export default (state: State = initialState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        sessionId: payload.sessionId,
      };
    case AuthActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        sessionId: null,
      };
    default:
      return state;
  }
};
