import AuthActionTypes from './auth.types';

const initialState = {
  sessionId: null,
};

export default (state = initialState, action) => {
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
