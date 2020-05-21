import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';

import { details as movie } from 'store/fixtures/movie';

import MovieOverviewBody from './MovieOverviewBody';

describe('MovieOverviewBody component', () => {
  let shallow;
  let wrapper;

  beforeAll(() => {
    shallow = createShallow();
  });

  beforeEach(() => {
    const mockProps = {
      movie,
    };
    wrapper = shallow(<MovieOverviewBody {...mockProps} />);
  });

  it('should render the MovieOverviewBody component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
