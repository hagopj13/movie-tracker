import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';

import Dialog from 'components/Dialog/Dialog';

import { LoginDialog } from './LoginDialog';
import LoginForm from '../Form/LoginForm';

describe('LoginDialog component', () => {
  let shallow;
  const isOpen = true;
  const isLoginLoading = false;
  const loginError = 'some error';
  let mockClose;
  let mockLogin;
  let mockLoginClear;
  let wrapper;

  beforeAll(() => {
    shallow = createShallow();
  });

  beforeEach(() => {
    mockClose = jest.fn();
    mockLogin = jest.fn();
    mockLoginClear = jest.fn();
    const mockProps = {
      isOpen,
      isLoginLoading,
      loginError,
      onClose: mockClose,
      onLogin: mockLogin,
      onLoginClear: mockLoginClear,
    };
    wrapper = shallow(<LoginDialog {...mockProps} />);
  });

  it('should render the LoginDialog component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should pass isOpen prop to Dialog', () => {
    expect(wrapper.find(Dialog).prop('isOpen')).toBe(isOpen);
  });

  it('should pass isLoginLoading prop to LoginForm', () => {
    expect(wrapper.find(LoginForm).prop('isLoginLoading')).toBe(isLoginLoading);
  });

  it('should pass loginError prop to LoginForm', () => {
    expect(wrapper.find(LoginForm).prop('loginError')).toBe(loginError);
  });

  it('should call the onClose prop when Dialog is closed', () => {
    wrapper.find(Dialog).prop('onClose')();
    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  it('should call the onLoginClear prop when Dialog exits', () => {
    wrapper.find(Dialog).prop('onExited')();
    expect(mockLoginClear).toHaveBeenCalledTimes(1);
  });

  it('should call the onLogin prop when LoginForm is submitted', () => {
    wrapper.find(LoginForm).prop('onSubmit')();
    expect(mockLogin).toHaveBeenCalledTimes(1);
  });
});
