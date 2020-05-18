import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { createShallow } from '@material-ui/core/test-utils';
import MenuItem from '@material-ui/core/MenuItem';

import { navigationItems } from 'config';

import { DrawerNavigation } from './DrawerNavigation';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

describe('DrawerNavigation component', () => {
  let shallow;
  let wrapper;

  beforeAll(() => {
    shallow = createShallow();
  });

  beforeEach(() => {
    useLocation.mockReturnValue({ pathname: '/' });
    const mockProps = {
      isAuth: true,
    };
    wrapper = shallow(<DrawerNavigation {...mockProps} />);
  });

  it('should render the DrawerNavigation component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render NavLink for each navigation item', () => {
    expect(wrapper.find(NavLink)).toHaveLength(navigationItems.length);
  });

  it('should set selected prop of MenuItem to true when it matched the current location', () => {
    expect(wrapper.find(MenuItem).at(0).prop('selected')).toBe(true);
  });

  it('should only render navigation items that do no require auth if isAuth is false', () => {
    const mockProps = {
      isAuth: false,
    };
    const newWrapper = shallow(<DrawerNavigation {...mockProps} />);
    const publicNavItems = navigationItems.filter((navItem) => !navItem.requiresAuth);
    expect(newWrapper.find(NavLink)).toHaveLength(publicNavItems.length);
  });
});
