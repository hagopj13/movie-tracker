const initialState = {};

export default (state = initialState, action) => {
  const { type, payload } = action;
  const matches = /(.*)_(START|SUCCESS|FAILURE|CLEAR)/.exec(type);

  if (!matches) {
    return state;
  }

  const [, requestName, requestState] = matches;
  return {
    ...state,
    [requestName]: requestState === 'FAILURE' ? payload.error : '',
  };
};
