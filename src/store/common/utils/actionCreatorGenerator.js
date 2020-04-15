function actionCreatorGenerator<T = any>(namespace: string, actionCreators: any): T {
  return Object.keys(actionCreators).reduce((result, key) => {
    result[key] = actionCreators[key](namespace);
    return result;
  }, {});
}

export default actionCreatorGenerator;
