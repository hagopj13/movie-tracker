import React from 'react';
import { mount } from 'enzyme';

import ErrorPage from 'pages/ErrorPage/ErrorPage';

import ErrorBoundary from './ErrorBoundary';

describe('ErrorBoundary HOC', () => {
  let wrapper;

  const ChildComponent = () => <div>Child component</div>;

  beforeEach(() => {
    wrapper = mount(
      <ErrorBoundary>
        <ChildComponent />
      </ErrorBoundary>,
    );
  });

  it('should render children if no errors have occured', () => {
    expect(wrapper.exists(ChildComponent)).toBe(true);
    expect(wrapper.state('hasError')).toBe(false);
  });

  it('should display the error page if wrapper component throws', () => {
    const mockConsoleError = jest.spyOn(global.console, 'error').mockImplementation();
    wrapper.find(ChildComponent).simulateError(new Error());
    expect(mockConsoleError).toHaveBeenCalledTimes(1);
    expect(wrapper.state('hasError')).toBe(true);
    expect(wrapper.exists(ErrorPage)).toBe(true);
  });
});
