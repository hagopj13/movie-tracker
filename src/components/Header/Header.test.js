import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import IconButton from '@material-ui/core/IconButton';

import Header from './Header';
import HeaderNavigation from './Navigation/HeaderNavigation';
import HeaderSearch from './Search/HeaderSearch';
import HeaderAuthButton from './AuthButton/HeaderAuthButton';

describe('Header component', () => {
  let shallow;
  const title = 'Some title';
  let mockOpenDrawer;
  let wrapper;

  beforeAll(() => {
    shallow = createShallow();
  });

  beforeEach(() => {
    mockOpenDrawer = jest.fn();
    const mockProps = {
      title,
      onOpenDrawer: mockOpenDrawer,
    };
    wrapper = shallow(<Header {...mockProps} />);
  });

  it('should render the Header component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the HeaderNavigation component', () => {
    expect(wrapper.exists(HeaderNavigation)).toBe(true);
  });

  it('should render the HeaderSearch component', () => {
    expect(wrapper.exists(HeaderSearch)).toBe(true);
  });

  it('should render the HeaderAuthButton component', () => {
    expect(wrapper.exists(HeaderAuthButton)).toBe(true);
  });

  it('should call the onOpenDrawer prop when icon button is clicked', () => {
    wrapper.find(IconButton).simulate('click');
    expect(mockOpenDrawer).toHaveBeenCalled();
  });
});
