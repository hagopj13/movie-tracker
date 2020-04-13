// @flow
import actionHandlerGenerator from './actionHandlerGenerator';

export default (namespace = '', defaultActionHandler: any, initialState?: any) => {
  const actionHandler = actionHandlerGenerator(namespace, defaultActionHandler);
  return (state = initialState, action) =>
    actionHandler[action.type] ? actionHandler[action.type](state, action) : state;
};
