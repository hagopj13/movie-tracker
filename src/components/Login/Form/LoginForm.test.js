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

  it('should disabled the login button when isLoginLoading is true', () => {
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
      isLoginLoading: true,
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
    const newWrapper = mount(<LoginForm {...mockProps} />);

    await act(async () => {
      const usernameElement = newWrapper.find('input').at(0);
      usernameElement.getDOMNode().value = 'someUsername';
      usernameElement.getDOMNode().dispatchEvent(new Event('input'));

      const passwordElement = newWrapper.find('input').at(1);
      passwordElement.getDOMNode().value = 'somePassword';
      passwordElement.getDOMNode().dispatchEvent(new Event('input'));

      newWrapper.find('form').simulate('submit');
    });

    await act(async () => {
      expect(mockSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
