import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';

import { details as movie } from 'store/fixtures/movie';

import MovieOverviewHeader from './MovieOverviewHeader';

describe('MovieOverviewHeader component', () => {
  let shallow;
  let wrapper;

  beforeAll(() => {
    shallow = createShallow();
  });

  beforeEach(() => {
    const mockProps = {
      movie,
    };
    wrapper = shallow(<MovieOverviewHeader {...mockProps} />);
  });

  it('should render the MovieOverviewHeader component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
