import React from 'react';
import moment from 'moment';
import { createShallow } from '@material-ui/core/test-utils';

import { genres } from 'store/fixtures/config';
import sortOptions from 'config/sortOptions';

import { DiscoverMoviesFilters } from './DiscoverMoviesFilters';

describe('DiscoverMoviesFilters component', () => {
  let shallow;
  let allGenres;
  let selectedFilters;
  let wrapper;

  const mockUpdateResults = jest.fn();
  const mockSetSortBy = jest.fn();
  const mockToggleGenre = jest.fn();
  const mockSetReleaseDateStart = jest.fn();
  const mockSetReleaseDateEnd = jest.fn();

  beforeAll(() => {
    shallow = createShallow();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    allGenres = genres;
    selectedFilters = {
      sortBy: sortOptions[1].value,
      genres: [genres[1].id],
      releaseDateStart: moment('2020-01-01'),
      releaseDateEnd: moment('2020-02-01'),
    };
    const mockProps = {
      allGenres,
      selectedFilters,
      onUpdateResults: mockUpdateResults,
      onSetSortBy: mockSetSortBy,
      onToggleGenre: mockToggleGenre,
      onSetReleaseDateStart: mockSetReleaseDateStart,
      onSetReleaseDateEnd: mockSetReleaseDateEnd,
    };
    wrapper = shallow(<DiscoverMoviesFilters {...mockProps} />);
  });

  it('should render the DiscoverMoviesFilters component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
