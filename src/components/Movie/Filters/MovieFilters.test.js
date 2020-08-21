import React from 'react';
import moment from 'moment';
import { createShallow } from '@material-ui/core/test-utils';

import { genres } from 'store/fixtures/config';
import sortOptions from 'config/sortOptions';
import Select from 'components/Input/Select/Select';
import ChipList from 'components/Input/ChipList/ChipList';
import DatePicker from 'components/Input/DatePicker/DatePicker';

import MovieFilters from './MovieFilters';

describe('MovieFilters component', () => {
  let shallow;
  let allGenres;
  let selectedFilters;
  let wrapper;

  const mockFiltersChanged = jest.fn();
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
      onFiltersChanged: mockFiltersChanged,
      onSetSortBy: mockSetSortBy,
      onToggleGenre: mockToggleGenre,
      onSetReleaseDateStart: mockSetReleaseDateStart,
      onSetReleaseDateEnd: mockSetReleaseDateEnd,
    };
    wrapper = shallow(<MovieFilters {...mockProps} />);
  });

  it('should render the MovieFilters component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should pass sortBy selected filter to Select', () => {
    expect(wrapper.find(Select).prop('selectedValue')).toBe(selectedFilters.sortBy);
  });

  it('should pass genres selected filter to ChipList', () => {
    expect(wrapper.find(ChipList).prop('selectedItems')).toBe(selectedFilters.genres);
  });

  it('should pass releaseDateStart selected filter to DatePicker', () => {
    expect(wrapper.find(DatePicker).at(0).prop('selectedDate')).toBe(
      selectedFilters.releaseDateStart,
    );
  });

  it('should pass releaseDateEnd selected filter to DatePicker', () => {
    expect(wrapper.find(DatePicker).at(1).prop('selectedDate')).toBe(
      selectedFilters.releaseDateEnd,
    );
  });

  it('should handle sortBy filter change', () => {
    const newSortBy = sortOptions[2].value;
    wrapper.find(Select).prop('onValueChange')(newSortBy);
    expect(mockSetSortBy).toHaveBeenCalledTimes(1);
    expect(mockSetSortBy).toHaveBeenLastCalledWith(newSortBy);
    expect(mockFiltersChanged).toHaveBeenCalledTimes(1);
  });

  it('should handle genre toggle', () => {
    const genre = genres[2].id;
    wrapper.find(ChipList).prop('onItemClick')(genre);
    expect(mockToggleGenre).toHaveBeenCalledTimes(1);
    expect(mockToggleGenre).toHaveBeenLastCalledWith(genre);
    expect(mockFiltersChanged).toHaveBeenCalledTimes(1);
  });

  it('should handle releaseDateStart filter change', () => {
    const newReleaseDateStart = moment();
    wrapper.find(DatePicker).at(0).prop('onDateChange')(newReleaseDateStart);
    expect(mockSetReleaseDateStart).toHaveBeenCalledTimes(1);
    expect(mockSetReleaseDateStart).toHaveBeenLastCalledWith(newReleaseDateStart);
    expect(mockFiltersChanged).toHaveBeenCalledTimes(1);
  });

  it('should handle releaseDateEnd filter change', () => {
    const newReleaseDateEnd = moment();
    wrapper.find(DatePicker).at(1).prop('onDateChange')(newReleaseDateEnd);
    expect(mockSetReleaseDateEnd).toHaveBeenCalledTimes(1);
    expect(mockSetReleaseDateEnd).toHaveBeenLastCalledWith(newReleaseDateEnd);
    expect(mockFiltersChanged).toHaveBeenCalledTimes(1);
  });
});
