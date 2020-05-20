import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';

import SearchField from './SearchField';

describe('SearchField component', () => {
  let shallow;
  let wrapper;

  beforeAll(() => {
    shallow = createShallow();
  });

  beforeEach(() => {
    wrapper = shallow(<SearchField />);
  });

  it('should render the SearchField component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
