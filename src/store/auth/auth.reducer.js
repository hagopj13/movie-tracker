import AuthActionTypes from './auth.types';

const initialState = {
  sessionId: null,
  error: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        sessionId: payload.sessionId,
        error: null,
      };
    case AuthActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        error: payload.error,
      };
    default:
      return state;
  }
};
