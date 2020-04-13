// @flow
export default (namespace: string, actionCreators: any) =>
  Object.keys(actionCreators).reduce((result, key) => {
    result[key] = actionCreators[key](namespace);
    return result;
  }, {});
