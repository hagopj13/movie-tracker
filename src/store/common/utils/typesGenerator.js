import typeGenerator from './typeGenerator';

function typesGenerator<T = any>(namespace: string, types: any): T {
  Object.keys(types).reduce((result, key) => {
    result[key] = typeGenerator(namespace, types[key]);
    return result;
  }, {});
}

export default typesGenerator;
