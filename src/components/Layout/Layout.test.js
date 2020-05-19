import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';

import Layout from './Layout';

describe('Layout component', () => {
  let shallow;
  const ChildComponent = () => <div>Child component</div>;
  let wrapper;

  beforeAll(() => {
    shallow = createShallow();
  });

  beforeEach(() => {
    wrapper = shallow(
      <Layout>
        <ChildComponent />
      </Layout>,
    );
  });

  it('should render the Layout component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the child component', () => {
    expect(wrapper.exists(ChildComponent)).toBe(true);
  });
});
