import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import MuiDrawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';

import Drawer from './Drawer';
import Navigation from './Navigation/DrawerNavigation';
import AuthButton from './AuthButton/DrawerAuthButton';

describe('Drawer component', () => {
  let shallow;
  let isOpen;
  let wrapper;

  const mockClose = jest.fn();

  beforeAll(() => {
    shallow = createShallow();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    isOpen = true;
    const mockProps = {
      isOpen,
      onClose: mockClose,
    };
    wrapper = shallow(<Drawer {...mockProps} />);
  });

  it('should render the Drawer component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should pass isOpen as a prop to MuiDrawer', () => {
    expect(wrapper.find(MuiDrawer).prop('open')).toBe(isOpen);
  });

  it('should call the onClose prop when close icon is clicked', () => {
    wrapper.find(IconButton).simulate('click');
    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  it('should call the onClose prop when a click occurs in the navigation div', () => {
    wrapper.find(Navigation).parent().simulate('click');
    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  it('should call the onClose prop when a click occurs in the auth button div', () => {
    wrapper.find(AuthButton).parent().simulate('click');
    expect(mockClose).toHaveBeenCalledTimes(1);
  });
});
