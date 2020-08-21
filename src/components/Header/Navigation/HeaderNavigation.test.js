import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import navigationItems from 'config/navigationItems';

import { HeaderNavigation } from './HeaderNavigation';

describe('HeaderNavigation component', () => {
  let shallow;
  let wrapper;

  beforeAll(() => {
    shallow = createShallow();
  });

  beforeEach(() => {
    const mockProps = {
      isAuth: true,
    };
    wrapper = shallow(<HeaderNavigation {...mockProps} />);
  });

  it('should render the HeaderNavigation component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render Link for each navigation item', () => {
    expect(wrapper.find(Link)).toHaveLength(navigationItems.length);
  });

  it('should pass the path to the "to" prop of NavLink', () => {
    expect(wrapper.find(Link).at(0).prop('to')).toBe(navigationItems[0].to);
  });

  it('should pass the label to the "primary" prop of ListItemText', () => {
    expect(wrapper.find(Typography).at(0).text()).toBe(navigationItems[0].label);
  });

  it('should only render navigation items that do no require auth if isAuth is false', () => {
    const mockProps = {
      isAuth: false,
    };
    const newWrapper = shallow(<HeaderNavigation {...mockProps} />);
    const publicNavItems = navigationItems.filter((navItem) => !navItem.requiresAuth);
    expect(newWrapper.find(Link)).toHaveLength(publicNavItems.length);
  });
});
