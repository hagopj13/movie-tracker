import actionHandlerGenerator from './actionHandlerGenerator';

describe('actionHandlerGenerator', () => {
  it('should prepend the namespace to every key in the actionHandler', () => {
    const namespace = 'someNamespace';
    const actionHandler = {
      action1: jest.fn(),
      action2: jest.fn(),
    };
    expect(actionHandlerGenerator(namespace, actionHandler)).toEqual({
      [`${namespace}/action1`]: actionHandler.action1,
      [`${namespace}/action2`]: actionHandler.action2,
    });
  });
});
