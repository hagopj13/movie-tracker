import React from 'react';
import { mount } from 'enzyme';

import ErrorPage from 'pages/ErrorPage/ErrorPage';

import ErrorBoundary from './ErrorBoundary';

describe('ErrorBoundary HOC', () => {
  const SomeComponent = () => <div>Some component</div>;
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <ErrorBoundary>
        <SomeComponent />
      </ErrorBoundary>,
    );
  });

  it('should render children if no errors have occured', () => {
    expect(wrapper.find(SomeComponent)).toHaveLength(1);
    expect(wrapper.state('hasError')).toBe(false);
  });

  it('should display the error page if wrapper component throws', () => {
    const mockConsoleError = jest.spyOn(global.console, 'error').mockImplementation();
    wrapper.find(SomeComponent).simulateError(new Error());
    expect(mockConsoleError).toHaveBeenCalled();
    expect(wrapper.state('hasError')).toBe(true);
    expect(wrapper.find(ErrorPage)).toHaveLength(1);
  });
});
