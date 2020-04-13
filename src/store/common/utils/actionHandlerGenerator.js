// @flow
import typeGenerator from './typeGenerator';

export default (namespace: string, actionHandler: any) =>
  Object.keys(actionHandler).reduce((result, key) => {
    const actionType = typeGenerator(namespace, key);
    result[actionType] = actionHandler[key];
    return result;
  }, {});
