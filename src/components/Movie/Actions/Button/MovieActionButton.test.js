import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

import MovieActionButton from './MovieActionButton';

describe('MovieActionButton component', () => {
  let shallow;
  let title;
  let wrapper;

  const mockClick = jest.fn();
  const ChildComponent = () => <div>Some child component</div>;

  beforeAll(() => {
    shallow = createShallow();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    title = 'Some title';
    const mockProps = {
      title,
      onClick: mockClick,
    };
    wrapper = shallow(
      <MovieActionButton {...mockProps}>
        <ChildComponent />
      </MovieActionButton>,
    );
  });

  it('should render the MovieActionButton component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the child component', () => {
    expect(wrapper.exists(ChildComponent)).toBe(true);
  });

  it('should pass the title to the Tooltip', () => {
    expect(wrapper.find(Tooltip).prop('title')).toBe(title);
  });

  it('should call onClick when Fab is clicked', () => {
    wrapper.find(Fab).simulate('click');
    expect(mockClick).toHaveBeenCalledTimes(1);
  });
});
