import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import Typography from '@material-ui/core/Typography';

import FilterBoxItem from './FilterBoxItem';

describe('FilterBoxItem component', () => {
  let shallow;
  let wrapper;

  const ChildComponent = () => <div>Child component</div>;

  beforeAll(() => {
    shallow = createShallow();
  });

  beforeEach(() => {
    wrapper = shallow(
      <FilterBoxItem>
        <ChildComponent />
      </FilterBoxItem>,
    );
  });

  it('should render the FilterBoxItem component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the child component', () => {
    expect(wrapper.exists(ChildComponent)).toBe(true);
  });

  it('should render the FilterBoxItem component correctly if title prop is specified', () => {
    const title = 'Some title';
    const mockProps = { title };
    const newWrapper = shallow(
      <FilterBoxItem {...mockProps}>
        <ChildComponent />
      </FilterBoxItem>,
    );
    expect(newWrapper).toMatchSnapshot();
  });

  it('should render the title if title prop is specified', () => {
    const title = 'Some title';
    const mockProps = { title };
    const newWrapper = shallow(
      <FilterBoxItem {...mockProps}>
        <ChildComponent />
      </FilterBoxItem>,
    );
    expect(newWrapper.find(Typography).text()).toBe(title);
  });
});
