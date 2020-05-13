import typesGenerator from './typesGenerator';

describe('typesGenerator', () => {
  it('should prepend the namespace to every action type', () => {
    const namespace = 'someNamespace';
    const types = {
      type1: 'SOME_TYPE_1',
      type2: 'SOME_TYPE_2',
    };
    expect(typesGenerator(namespace, types)).toEqual({
      type1: `${namespace}/${types.type1}`,
      type2: `${namespace}/${types.type2}`,
    });
  });
});
