import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { DrawerAuthButton } from './DrawerAuthButton';

describe('DrawerAuthButton component', () => {
  let shallow;
  let wrapper;

  const mockShowLoginDialog = jest.fn();
  const mockLogout = jest.fn();

  beforeAll(() => {
    shallow = createShallow();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('isAuth is true', () => {
    beforeEach(() => {
      const mockProps = {
        isAuth: true,
        onLogout: mockLogout,
        onShowLoginDialog: mockShowLoginDialog,
      };
      wrapper = shallow(<DrawerAuthButton {...mockProps} />);
    });

    it('should render the DrawerAuthButton component correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render the logout button', () => {
      expect(wrapper.find(ListItemText).prop('primary')).toBe('Logout');
    });

    it('should call onLogout when the button is clicked', () => {
      wrapper.find(ListItem).simulate('click');
      expect(mockLogout).toHaveBeenCalledTimes(1);
    });
  });

  describe('isAuth is false', () => {
    beforeEach(() => {
      const mockProps = {
        isAuth: false,
        onLogout: mockLogout,
        onShowLoginDialog: mockShowLoginDialog,
      };
      wrapper = shallow(<DrawerAuthButton {...mockProps} />);
    });

    it('should render the DrawerAuthButton component correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render the login button', () => {
      expect(wrapper.find(ListItemText).prop('primary')).toBe('Login');
    });

    it('should call onShowLoginDialog when the button is clicked', () => {
      wrapper.find(ListItem).simulate('click');
      expect(mockShowLoginDialog).toHaveBeenCalledTimes(1);
    });
  });
});
