import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';

import { mountWithStore } from 'testUtils';
import Spinner from 'components/Spinner/Spinner';

import { UpcomingMovies } from './UpcomingMovies';

describe('UpcomingMovies page', () => {
  let shallow;
  let wrapper;

  const mockFetchMovies = jest.fn();

  beforeAll(() => {
    shallow = createShallow();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the UpcomingMovies page correctly', () => {
    const mockProps = {
      isLoadingConfig: false,
      onFetchMovies: mockFetchMovies,
    };
    wrapper = shallow(<UpcomingMovies {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a Spinner when config is loading', () => {
    const mockProps = {
      isLoadingConfig: true,
      onFetchMovies: mockFetchMovies,
    };
    wrapper = shallow(<UpcomingMovies {...mockProps} />);
    expect(wrapper.exists(Spinner)).toBe(true);
  });

  it('should fetch movies after mounting', () => {
    const mockProps = {
      isLoadingConfig: false,
      onFetchMovies: mockFetchMovies,
    };
    wrapper = mountWithStore(<UpcomingMovies {...mockProps} />);
    expect(mockFetchMovies).toHaveBeenCalledTimes(1);
  });
});
