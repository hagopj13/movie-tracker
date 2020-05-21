import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';

import { mountWithStore } from 'testUtils';
import Spinner from 'components/Spinner/Spinner';

import { DiscoverMovies } from './DiscoverMovies';

describe('DiscoverMovies page', () => {
  let shallow;
  let wrapper;

  const mockFetchAllGenres = jest.fn();
  const mockFetchMovies = jest.fn();

  beforeAll(() => {
    shallow = createShallow();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the DiscoverMovies page correctly', () => {
    const mockProps = {
      isLoadingConfig: false,
      onFetchAllGenres: mockFetchAllGenres,
      onFetchMovies: mockFetchMovies,
    };
    wrapper = shallow(<DiscoverMovies {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a Spinner when config is loading', () => {
    const mockProps = {
      isLoadingConfig: true,
      onFetchAllGenres: mockFetchAllGenres,
      onFetchMovies: mockFetchMovies,
    };
    wrapper = shallow(<DiscoverMovies {...mockProps} />);
    expect(wrapper.exists(Spinner)).toBe(true);
  });

  it('should fetch all genres and movies after mounting', () => {
    const mockProps = {
      isLoadingConfig: false,
      onFetchAllGenres: mockFetchAllGenres,
      onFetchMovies: mockFetchMovies,
    };
    wrapper = mountWithStore(<DiscoverMovies {...mockProps} />);
    expect(mockFetchAllGenres).toHaveBeenCalledTimes(1);
    expect(mockFetchMovies).toHaveBeenCalledTimes(1);
  });
});
