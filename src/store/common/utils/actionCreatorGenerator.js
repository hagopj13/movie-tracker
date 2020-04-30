function actionCreatorGenerator<T>(namespace: string, actionCreators: T): T {
  return Object.keys(actionCreators).reduce((result, key) => {
    result[key] = actionCreators[key](namespace);
    return result;
  }, {});
}

export default actionCreatorGenerator;
