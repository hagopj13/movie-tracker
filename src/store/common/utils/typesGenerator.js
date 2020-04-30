import typeGenerator from './typeGenerator';

function typesGenerator<T>(namespace: string, types: T): T {
  return Object.keys(types).reduce((result, key) => {
    result[key] = typeGenerator(namespace, types[key]);
    return result;
  }, {});
}

export default typesGenerator;
