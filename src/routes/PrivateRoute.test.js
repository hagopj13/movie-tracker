import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import { PrivateRoute } from './PrivateRoute';

describe('PrivateRoute HOC', () => {
  const PrivateComponent = () => <div>Some private component</div>;

  it('it should render a Route containing a private component if isAuth is true', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/privateRoute']}>
        <PrivateRoute isAuth path="/privateRoute" component={PrivateComponent} />
      </MemoryRouter>,
    );
    expect(wrapper.exists(PrivateComponent)).toBe(true);
    expect(wrapper.find('Router').prop('history').location.pathname).toEqual('/privateRoute');
  });

  it('it should redirect to the homepage if isAuth is false', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/privateRoute']}>
        <PrivateRoute isAuth={false} path="/privateRoute" component={PrivateComponent} />
      </MemoryRouter>,
    );
    expect(wrapper.exists(PrivateComponent)).toBe(false);
    expect(wrapper.find('Router').prop('history').location.pathname).toEqual('/');
  });
});
