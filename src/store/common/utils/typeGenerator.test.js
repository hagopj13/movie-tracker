import typeGenerator from './typeGenerator';

describe('typeGenerator', () => {
  it('should prepend the namespace to the action type', () => {
    const namespace = 'someNamespace';
    const type = 'SOME_TYPE';
    expect(typeGenerator(namespace, type)).toBe(`${namespace}/${type}`);
  });

  it('should return the action type if namespace is an empty string or undefined', () => {
    const type = 'SOME_TYPE';
    expect(typeGenerator('', type)).toBe(type);
    expect(typeGenerator(undefined, type)).toBe(type);
  });
});
