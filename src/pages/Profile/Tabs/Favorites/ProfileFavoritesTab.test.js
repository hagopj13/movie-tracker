import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';

import movies from 'store/fixtures/movies';

import { ProfileFavoritesTab } from './ProfileFavoritesTab';

describe('ProfileFavoritesTab component', () => {
  let shallow;
  let wrapper;

  const mockFetchMovies = jest.fn();
  const mockFetchMoreMovies = jest.fn();

  beforeAll(() => {
    shallow = createShallow();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    const mockProps = {
      movies: movies.list,
      isLoading: false,
      isLoadingMore: false,
      onFetchMovies: mockFetchMovies,
      onFetchMoreMovies: mockFetchMoreMovies,
    };
    wrapper = shallow(<ProfileFavoritesTab {...mockProps} />);
  });

  it('should render the ProfileFavoritesTab component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
