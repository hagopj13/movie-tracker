import React from 'react';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import PasswordTextField from './PasswordTextField';

describe('PasswordTextField component', () => {
  let shallow;
  let mount;

  beforeAll(() => {
    shallow = createShallow();
    mount = createMount();
  });

  it('should render the PasswordTextField component correctly', () => {
    const wrapper = shallow(<PasswordTextField />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should initially set the textfield type to password', () => {
    const wrapper = shallow(<PasswordTextField />);
    expect(wrapper.find(TextField).prop('type')).toBe('password');
  });

  it('should initially show the visibility off icon', () => {
    // use mount here to make sure endAdornment renders
    const wrapper = mount(<PasswordTextField />);
    expect(wrapper.exists(VisibilityOffIcon)).toBe(true);
  });

  it('should set the textfield type to text after show password icon is clicked', () => {
    // use mount here to make sure endAdornment renders
    const wrapper = mount(<PasswordTextField />);
    wrapper.find(IconButton).simulate('click');
    expect(wrapper.find(TextField).prop('type')).toBe('text');
  });

  it('should initially show the visibility off icon', () => {
    // use mount here to make sure endAdornment renders
    const wrapper = mount(<PasswordTextField />);
    wrapper.find(IconButton).simulate('click');
    expect(wrapper.exists(VisibilityIcon)).toBe(true);
  });
});
