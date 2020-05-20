import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';

import { MovieBackdrop } from './MovieBackdrop';

describe('MovieBackdrop component', () => {
  let shallow;
  let backdropPath;
  let fullBackdropPath;
  let wrapper;

  const ChildComponent = () => <div>Some child component</div>;

  beforeAll(() => {
    shallow = createShallow();
  });

  beforeEach(() => {
    backdropPath = 'pathToBackdropImage.png';
    fullBackdropPath = 'fullPathToBackdropImage.png';
    const mockProps = {
      backdropPath,
      fullBackdropPath,
    };
    wrapper = shallow(
      <MovieBackdrop {...mockProps}>
        <ChildComponent />
      </MovieBackdrop>,
    );
  });

  it('should render the MovieBackdrop component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the child component', () => {
    expect(wrapper.exists(ChildComponent)).toBe(true);
  });
});
