import React from 'react';
import { act } from 'react-dom/test-utils';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import LoginForm from './LoginForm';

describe('LoginForm component', () => {
  let shallow;
  let mount;

  beforeAll(() => {
    shallow = createShallow();
    mount = createMount();
  });

  it('should render the LoginForm component correctly', () => {
    const mockProps = {
      isLoginLoading: false,
      loginError: '',
      onSubmit: jest.fn(),
    };
    const wrapper = shallow(<LoginForm {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should not disable the login button when login is not loading', () => {
    const mockProps = {
      isLoginLoading: false,
      loginError: '',
      onSubmit: jest.fn(),
    };
    const wrapper = shallow(<LoginForm {...mockProps} />);
    expect(wrapper.find(Button).prop('disabled')).toBe(false);
  });

  it('should disable the login button when login is loading', () => {
    const mockProps = {
      isLoginLoading: true,
      loginError: '',
      onSubmit: jest.fn(),
    };
    const wrapper = shallow(<LoginForm {...mockProps} />);
    expect(wrapper.find(Button).prop('disabled')).toBe(true);
  });

  it('should render the error text when loginError is set', () => {
    const loginError = 'some error';
    const mockProps = {
      isLoginLoading: false,
      loginError,
      onSubmit: jest.fn(),
    };
    const wrapper = shallow(<LoginForm {...mockProps} />);
    expect(wrapper.find(Typography).text()).toBe(loginError);
  });

  it('should call the onSubmit when form is submitted', async () => {
    const mockSubmit = jest.fn();
    const mockProps = {
      isLoginLoading: false,
      loginError: '',
      onSubmit: mockSubmit,
    };
    const wrapper = mount(<LoginForm {...mockProps} />);

    const username = 'someUsername';
    const password = 'somePassword';

    const usernameElement = wrapper.find('input').at(0);
    usernameElement.getDOMNode().value = username;
    usernameElement.getDOMNode().dispatchEvent(new Event('input'));

    const passwordElement = wrapper.find('input').at(1);
    passwordElement.getDOMNode().value = password;
    passwordElement.getDOMNode().dispatchEvent(new Event('input'));

    await act(async () => {
      wrapper.find('form').simulate('submit');
    });

    expect(mockSubmit).toHaveBeenCalledTimes(1);
    expect(mockSubmit.mock.calls[0][0]).toEqual({ username, password });
  });
});
