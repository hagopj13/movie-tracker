import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import { ProfileHeader } from './ProfileHeader';

describe('ProfileHeader component', () => {
  let shallow;
  let userName;
  let wrapper;

  beforeAll(() => {
    shallow = createShallow();
  });

  beforeEach(() => {
    userName = 'Some user name';
    const mockProps = {
      userName,
    };
    wrapper = shallow(<ProfileHeader {...mockProps} />);
  });

  it('should render the ProfileHeader component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the first letter of the user name in an Avatar', () => {
    expect(wrapper.find(Avatar).text()).toBe(userName.charAt(0).toUpperCase());
  });

  it('should render the user name', () => {
    expect(wrapper.find(Typography).text()).toBe(userName);
  });
});
