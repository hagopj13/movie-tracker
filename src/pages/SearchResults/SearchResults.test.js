import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';

import { mountWithStore } from 'testUtils';
import Spinner from 'components/Spinner/Spinner';

import { SearchResults } from './SearchResults';

describe('SearchResults page', () => {
  let shallow;
  let wrapper;

  const mockFetchMovies = jest.fn();

  beforeAll(() => {
    shallow = createShallow();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the SearchResults page correctly', () => {
    const mockProps = {
      isLoading: false,
      selectedSearchQuery: 'some search query',
      onFetchMovies: mockFetchMovies,
    };
    wrapper = shallow(<SearchResults {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a Spinner when it is loading', () => {
    const mockProps = {
      isLoading: true,
      selectedSearchQuery: 'some search query',
      onFetchMovies: mockFetchMovies,
    };
    wrapper = shallow(<SearchResults {...mockProps} />);
    expect(wrapper.exists(Spinner)).toBe(true);
  });

  it('should not render anything when there is no selected search query', () => {
    const mockProps = {
      isLoading: false,
      selectedSearchQuery: null,
      onFetchMovies: mockFetchMovies,
    };
    wrapper = shallow(<SearchResults {...mockProps} />);
    expect(wrapper.isEmptyRender()).toBe(true);
    expect(mockFetchMovies).not.toHaveBeenCalled();
  });

  it('should fetch movies after mounting', () => {
    const mockProps = {
      isLoading: false,
      selectedSearchQuery: 'some search query',
      onFetchMovies: mockFetchMovies,
    };
    wrapper = mountWithStore(<SearchResults {...mockProps} />);
    expect(mockFetchMovies).toHaveBeenCalledTimes(1);
  });
});
