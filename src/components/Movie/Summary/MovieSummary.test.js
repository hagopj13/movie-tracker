import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';

import movies from 'store/fixtures/movies';

import MovieSummary from './MovieSummary';

describe('MovieSummary component', () => {
  let shallow;
  let movie;
  let wrapper;

  beforeAll(() => {
    shallow = createShallow();
  });

  beforeEach(() => {
    [movie] = movies.list;
    const mockProps = {
      movie,
    };
    wrapper = shallow(<MovieSummary {...mockProps} />);
  });

  it('should render the MovieSummary component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
