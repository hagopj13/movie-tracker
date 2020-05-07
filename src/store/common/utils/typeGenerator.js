// @flow
export default (namespace: string, type: string) => `${namespace ? `${namespace}/` : ''}${type}`;
