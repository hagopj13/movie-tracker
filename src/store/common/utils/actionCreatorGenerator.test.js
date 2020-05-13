import actionCreatorGenerator from './actionCreatorGenerator';

describe('actionCreatorGenerator', () => {
  it('should generate the action creators by calling each one with the namespace and storing the returned value', () => {
    const namespace = 'someNamespace';
    const generatedAction1 = jest.fn();
    const generatedAction2 = jest.fn();
    const actionCreators = {
      action1: jest.fn().mockReturnValue(generatedAction1),
      action2: jest.fn().mockReturnValue(generatedAction2),
    };
    expect(actionCreatorGenerator(namespace, actionCreators)).toEqual({
      action1: generatedAction1,
      action2: generatedAction2,
    });
    expect(actionCreators.action1).toHaveBeenCalledWith(namespace);
    expect(actionCreators.action2).toHaveBeenCalledWith(namespace);
  });
});
