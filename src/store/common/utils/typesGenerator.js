// @flow
import typeGenerator from './typeGenerator';

export default (namespace: string, types: any) =>
  Object.keys(types).reduce((result, key) => {
    result[key] = typeGenerator(namespace, types[key]);
    return result;
  }, {});
