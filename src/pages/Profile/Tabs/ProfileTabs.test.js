import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';

import ProfileTabs from './ProfileTabs';

describe('ProfileTabs component', () => {
  let shallow;
  let wrapper;

  beforeAll(() => {
    shallow = createShallow();
  });

  beforeEach(() => {
    wrapper = shallow(<ProfileTabs />);
  });

  it('should render the ProfileTabs component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
