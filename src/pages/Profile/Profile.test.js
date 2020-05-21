import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';

import { mountWithStore } from 'testUtils';
import Spinner from 'components/Spinner/Spinner';

import { Profile } from './Profile';

describe('Profile page', () => {
  let shallow;
  let wrapper;

  const mockFetchProfile = jest.fn();

  beforeAll(() => {
    shallow = createShallow();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the Profile page correctly', () => {
    const mockProps = {
      isLoading: false,
      isLoaded: true,
      onFetchProfile: mockFetchProfile,
    };
    wrapper = shallow(<Profile {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a Spinner if isLoading is true', () => {
    const mockProps = {
      isLoading: true,
      isLoaded: true,
      onFetchProfile: mockFetchProfile,
    };
    wrapper = shallow(<Profile {...mockProps} />);
    expect(wrapper.exists(Spinner)).toBe(true);
  });

  it('should render a Spinner if isLoaded is false', () => {
    const mockProps = {
      isLoading: false,
      isLoaded: false,
      onFetchProfile: mockFetchProfile,
    };
    wrapper = shallow(<Profile {...mockProps} />);
    expect(wrapper.exists(Spinner)).toBe(true);
  });

  it('should fetch profile after mounting', () => {
    const mockProps = {
      isLoading: false,
      isLoaded: true,
      onFetchProfile: mockFetchProfile,
    };
    wrapper = mountWithStore(<Profile {...mockProps} />);
    expect(mockFetchProfile).toHaveBeenCalledTimes(1);
  });
});
