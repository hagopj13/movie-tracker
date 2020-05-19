import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { createShallow } from '@material-ui/core/test-utils';

import { mountWithStore } from 'testUtils';
import Layout from 'components/Layout/Layout';
import Spinner from 'components/Spinner/Spinner';
import AppRoutes from 'routes/AppRoutes';

import { App } from './App';

describe('App component', () => {
  let shallow;
  let mockCheckAuthState;
  let mockFetchImagesConfig;
  let wrapper;

  beforeAll(() => {
    shallow = createShallow();
  });

  beforeEach(() => {
    mockCheckAuthState = jest.fn();
    mockFetchImagesConfig = jest.fn();
    const mockProps = {
      isLogoutLoaded: false,
      isLoginLoaded: true,
      onCheckAuthState: mockCheckAuthState,
      onFetchImagesConfig: mockFetchImagesConfig,
    };
    wrapper = shallow(<App {...mockProps} />);
  });

  it('should render the App component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call onCheckAuthState and onFetchImagesConfig after mounting', () => {
    const mockProps = {
      isLogoutLoaded: false,
      isLoginLoaded: true,
      onCheckAuthState: mockCheckAuthState,
      onFetchImagesConfig: mockFetchImagesConfig,
    };
    mountWithStore(
      <MemoryRouter>
        <App {...mockProps} />
      </MemoryRouter>,
    );
    expect(mockCheckAuthState).toHaveBeenCalledTimes(1);
    expect(mockFetchImagesConfig).toHaveBeenCalledTimes(1);
  });

  it('should render Layout and AppRoutes if isLoginLoaded is true', () => {
    expect(wrapper.exists(Layout)).toBe(true);
    expect(wrapper.exists(AppRoutes)).toBe(true);
    expect(wrapper.exists(Spinner)).toBe(false);
  });

  it('should render Layout and AppRoutes if isLogoutLoaded is true', () => {
    const mockNewProps = {
      isLogoutLoaded: true,
      isLoginLoaded: false,
      onCheckAuthState: mockCheckAuthState,
      onFetchImagesConfig: mockFetchImagesConfig,
    };
    const newWrapper = shallow(<App {...mockNewProps} />);
    expect(newWrapper.exists(Layout)).toBe(true);
    expect(newWrapper.exists(AppRoutes)).toBe(true);
    expect(newWrapper.exists(Spinner)).toBe(false);
  });

  it('should render Spinner if isLogoutLoaded and isLoginLoaded are both false', () => {
    const mockNewProps = {
      isLogoutLoaded: false,
      isLoginLoaded: false,
      onCheckAuthState: mockCheckAuthState,
      onFetchImagesConfig: mockFetchImagesConfig,
    };
    const newWrapper = shallow(<App {...mockNewProps} />);
    expect(newWrapper.exists(Layout)).toBe(false);
    expect(newWrapper.exists(AppRoutes)).toBe(false);
    expect(newWrapper.exists(Spinner)).toBe(true);
  });
});
