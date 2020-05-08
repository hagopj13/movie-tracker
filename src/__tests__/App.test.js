import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';

import { App } from 'App';
import store from 'store/store';

describe('App component', () => {
  let mockCheckAuthState;
  let mockFetchImagesConfig;
  let wrapper;

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
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <App {...mockProps} />
        </MemoryRouter>
      </Provider>,
    );
    expect(mockCheckAuthState).toHaveBeenCalled();
    expect(mockFetchImagesConfig).toHaveBeenCalled();
  });

  it('should render Layout and AppRoutes if isLoginLoaded is true', () => {
    expect(wrapper.exists('Layout')).toBe(true);
    expect(wrapper.exists('AppRoutes')).toBe(true);
    expect(wrapper.exists('Spinner')).toBe(false);
  });

  it('should render Layout and AppRoutes if isLogoutLoaded is true', () => {
    const mockNewProps = {
      isLogoutLoaded: true,
      isLoginLoaded: false,
      onCheckAuthState: mockCheckAuthState,
      onFetchImagesConfig: mockFetchImagesConfig,
    };
    wrapper = shallow(<App {...mockNewProps} />);
    expect(wrapper.exists('Layout')).toBe(true);
    expect(wrapper.exists('AppRoutes')).toBe(true);
    expect(wrapper.exists('Spinner')).toBe(false);
  });

  it('should render Spinner if isLogoutLoaded and isLoginLoaded are both false', () => {
    const mockNewProps = {
      isLogoutLoaded: false,
      isLoginLoaded: false,
      onCheckAuthState: mockCheckAuthState,
      onFetchImagesConfig: mockFetchImagesConfig,
    };
    wrapper = shallow(<App {...mockNewProps} />);
    expect(wrapper.exists('Spinner')).toBe(true);
    expect(wrapper.exists('Layout')).toBe(false);
    expect(wrapper.exists('AppRoutes')).toBe(false);
  });
});
