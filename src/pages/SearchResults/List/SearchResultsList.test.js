import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';

import movies from 'store/fixtures/movies';
import MovieList from 'components/Movie/List/MovieList';
import Spinner from 'components/Spinner/Spinner';

import { SearchResultsList } from './SearchResultsList';

describe('SearchResultsList component', () => {
  let shallow;
  let wrapper;

  const mockFetchMoreMovies = jest.fn();

  beforeAll(() => {
    shallow = createShallow();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    const mockProps = {
      movies: movies.list,
      isLoadingMore: false,
      onFetchMoreMovies: mockFetchMoreMovies,
    };
    wrapper = shallow(<SearchResultsList {...mockProps} />);
  });

  it('should render the SearchResultsList component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should pass movies to MovieList', () => {
    expect(wrapper.find(MovieList).prop('movies')).toBe(movies.list);
  });

  it('should not render Spinner if isLoadingMore is false', () => {
    expect(wrapper.exists(Spinner)).toBe(false);
  });

  it('should render both MovieList and Spinner when isLoadingMore is true', () => {
    const mockProps = {
      movies: movies.list,
      isLoadingMore: true,
      onFetchMoreMovies: mockFetchMoreMovies,
    };
    const newWrapper = shallow(<SearchResultsList {...mockProps} />);
    expect(newWrapper.exists(MovieList)).toBe(true);
    expect(newWrapper.exists(Spinner)).toBe(true);
  });

  it('should not render anything when movies is an empty array', () => {
    const mockProps = {
      movies: [],
      isLoadingMore: false,
      onFetchMoreMovies: mockFetchMoreMovies,
    };
    const newWrapper = shallow(<SearchResultsList {...mockProps} />);
    expect(newWrapper.isEmptyRender()).toBe(true);
  });
});
