// @flow
type State = {
  [key: string]: boolean,
};

export const initialState: $Shape<State> = {};

export default (state: State = initialState, action: any): State => {
  const { type } = action;
  const matches = /(.*)_(START|SUCCESS|FAILURE)/.exec(type);

  if (!matches) {
    return state;
  }

  const [, requestName, requestState] = matches;
  return {
    ...state,
    [requestName]: requestState === 'START',
  };
};
