// @flow
import actionHandlerGenerator from './actionHandlerGenerator';

export default (namespace: string, defaultActionHandler: any, initialState?: any) => {
  const actionHandler = actionHandlerGenerator(namespace, defaultActionHandler);
  return (state: any = initialState, action: any) =>
    actionHandler[action.type] ? actionHandler[action.type](state, action) : state;
};
