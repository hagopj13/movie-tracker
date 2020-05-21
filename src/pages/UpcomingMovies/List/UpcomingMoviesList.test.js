import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';

import movies from 'store/fixtures/movies';
import MovieList from 'components/Movie/List/MovieList';
import Spinner from 'components/Spinner/Spinner';

import { UpcomingMoviesList } from './UpcomingMoviesList';

describe('UpcomingMoviesList component', () => {
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
      isLoading: false,
      isLoadingMore: false,
      onFetchMoreMovies: mockFetchMoreMovies,
    };
    wrapper = shallow(<UpcomingMoviesList {...mockProps} />);
  });

  it('should render the UpcomingMoviesList component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should pass movies to MovieList', () => {
    expect(wrapper.find(MovieList).prop('movies')).toBe(movies.list);
  });

  it('should not render Spinner if both isLoading and isLoadingMore are false', () => {
    expect(wrapper.exists(Spinner)).toBe(false);
  });

  it('should render Spinner when isLoading is true', () => {
    const mockProps = {
      movies: movies.list,
      isLoading: true,
      isLoadingMore: false,
      onFetchMoreMovies: mockFetchMoreMovies,
    };
    const newWrapper = shallow(<UpcomingMoviesList {...mockProps} />);
    expect(newWrapper.exists(Spinner)).toBe(true);
    expect(newWrapper.exists(MovieList)).toBe(false);
  });

  it('should render both MovieList and Spinner when isLoadingMore is true', () => {
    const mockProps = {
      movies: movies.list,
      isLoading: false,
      isLoadingMore: true,
      onFetchMoreMovies: mockFetchMoreMovies,
    };
    const newWrapper = shallow(<UpcomingMoviesList {...mockProps} />);
    expect(newWrapper.exists(MovieList)).toBe(true);
    expect(newWrapper.exists(Spinner)).toBe(true);
  });
});
