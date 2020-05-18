import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';

import Attribution from './Attribution';

describe('Attribution component', () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  it('should render the Attribution component correctly', () => {
    const wrapper = shallow(<Attribution />);
    expect(wrapper).toMatchSnapshot();
  });
});
