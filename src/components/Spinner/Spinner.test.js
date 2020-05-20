import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';

import Spinner from './Spinner';

describe('Spinner component', () => {
  let shallow;
  let wrapper;

  beforeAll(() => {
    shallow = createShallow();
  });

  beforeEach(() => {
    wrapper = shallow(<Spinner />);
  });

  it('should render the Spinner component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
