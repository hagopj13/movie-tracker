import reducerGenerator from './reducerGenerator';

describe('reducerGenerator', () => {
  it('should generate a reducer that calls the correct action of the actionHandler', () => {
    const namespace = 'someNamespace';
    const actionHandler = {
      action1: jest.fn(),
    };
    const reducer = reducerGenerator(namespace, actionHandler);
    const action = { type: `${namespace}/action1` };
    reducer(undefined, action);
    expect(actionHandler.action1).toHaveBeenCalledTimes(1);
  });

  it('should generate a reducer that returns the intial state when an unknown action is fired', () => {
    const initialState = { test: 'state' };
    const reducer = reducerGenerator('someNamespace', {}, initialState);
    const unknownAction = { type: 'SOME_UNKNOWN_TYPE' };
    expect(reducer(undefined, unknownAction)).toEqual(initialState);
  });
});
