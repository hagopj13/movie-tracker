import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { createMount } from '@material-ui/core/test-utils';

import { initialState } from 'store/rootReducer';

const mount = createMount();
const mockStore = configureMockStore()(initialState);

export const mountWithStore = (children, store = mockStore) =>
  mount(<Provider store={store}>{children}</Provider>);
