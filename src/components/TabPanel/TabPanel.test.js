import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';

import TabPanel from './TabPanel';

describe('TabPanel component', () => {
  let shallow;
  let value;
  let index;
  let wrapper;

  const ChildComponent = () => <div>Some child component</div>;

  beforeAll(() => {
    shallow = createShallow();
  });

  beforeEach(() => {
    value = 0;
    index = 0;
    const mockProps = {
      value,
      index,
    };
    wrapper = shallow(
      <TabPanel {...mockProps}>
        <ChildComponent />
      </TabPanel>,
    );
  });

  it('should render the TabPanel component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the child component when value === index', () => {
    expect(wrapper.exists(ChildComponent)).toBe(true);
  });

  it('should not render the child comonent when value !== index', () => {
    const mockProps = {
      value: 0,
      index: 1,
    };
    const newWrapper = shallow(
      <TabPanel {...mockProps}>
        <ChildComponent />
      </TabPanel>,
    );
    expect(newWrapper.exists(ChildComponent)).toBe(false);
  });
});
