// @flow
type State = {
  [key: string]: any,
};

const initialState: State = {};

export default (state: State = initialState, action: any) => {
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
