import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import Typography from '@material-ui/core/Typography';

import FilterBox from './FilterBox';

describe('FilterBox component', () => {
  let shallow;
  const title = 'Some title';
  const ChildComponent = () => <div>Child component</div>;
  let wrapper;

  beforeAll(() => {
    shallow = createShallow();
  });

  beforeEach(() => {
    const mockProps = {
      title,
    };
    wrapper = shallow(
      <FilterBox {...mockProps}>
        <ChildComponent />
      </FilterBox>,
    );
  });

  it('should render the FilterBox component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the title', () => {
    expect(wrapper.find(Typography).text()).toBe(title);
  });

  it('should render the child component', () => {
    expect(wrapper.exists(ChildComponent)).toBe(true);
  });
});
