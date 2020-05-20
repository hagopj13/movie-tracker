import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import Button from '@material-ui/core/Button';

import { HeaderAuthButton } from './HeaderAuthButton';

describe('HeaderAuthButton component', () => {
  let shallow;
  let wrapper;

  const mockLogout = jest.fn();
  const mockShowLoginDialog = jest.fn();

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
        isLogoutLoading: false,
        onLogout: mockLogout,
        onShowLoginDialog: mockShowLoginDialog,
      };
      wrapper = shallow(<HeaderAuthButton {...mockProps} />);
    });

    it('should render the HeaderAuthButton component correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render the logout button', () => {
      expect(wrapper.find(Button).text()).toBe('Logout');
    });

    it('should call onLogout when the button is clicked', () => {
      wrapper.find(Button).simulate('click');
      expect(mockLogout).toHaveBeenCalledTimes(1);
    });

    it('should not disable the logout button when logout it not loading', () => {
      expect(wrapper.find(Button).prop('disabled')).toBe(false);
    });

    it('should disable the logout button when logout is loading', () => {
      const mockProps = {
        isAuth: true,
        isLogoutLoading: true,
        onLogout: mockLogout,
        onShowLoginDialog: mockShowLoginDialog,
      };
      const newWrapper = shallow(<HeaderAuthButton {...mockProps} />);
      expect(newWrapper.find(Button).prop('disabled')).toBe(true);
    });
  });

  describe('isAuth is false', () => {
    beforeEach(() => {
      const mockProps = {
        isAuth: false,
        isLogoutLoading: false,
        onLogout: mockLogout,
        onShowLoginDialog: mockShowLoginDialog,
      };
      wrapper = shallow(<HeaderAuthButton {...mockProps} />);
    });

    it('should render the HeaderAuthButton component correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render the login button', () => {
      expect(wrapper.find(Button).text()).toBe('Login');
    });

    it('should call onShowLoginDialog when the button is clicked', () => {
      wrapper.find(Button).simulate('click');
      expect(mockShowLoginDialog).toHaveBeenCalledTimes(1);
    });
  });
});
