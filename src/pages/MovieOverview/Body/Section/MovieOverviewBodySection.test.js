import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import Typography from '@material-ui/core/Typography';

import MovieOverviewBodySection from './MovieOverviewBodySection';

describe('MovieOverviewBodySection component', () => {
  let shallow;
  let title;
  let wrapper;

  const ChildComponent = () => <div>Some child component</div>;

  beforeAll(() => {
    shallow = createShallow();
  });

  beforeEach(() => {
    title = 'Some title';
    const mockProps = {
      title,
    };
    wrapper = shallow(
      <MovieOverviewBodySection {...mockProps}>
        <ChildComponent />
      </MovieOverviewBodySection>,
    );
  });

  it('should render the MovieOverviewBodySection component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the title', () => {
    expect(wrapper.find(Typography).text()).toBe(title);
  });

  it('should render the child component', () => {
    expect(wrapper.exists(ChildComponent)).toBe(true);
  });
});
