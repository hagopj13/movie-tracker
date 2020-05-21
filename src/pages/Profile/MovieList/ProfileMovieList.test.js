import React from 'react';
import { act } from 'react-dom/test-utils';

import { mountWithStore } from 'testUtils';
import movies from 'store/fixtures/movies';
import MovieList from 'components/Movie/List/MovieList';
import Spinner from 'components/Spinner/Spinner';

import { ProfileMovieList } from './ProfileMovieList';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe('ProfileMovieList component', () => {
  let wrapper;

  const mockFetchMovies = jest.fn();
  const mockFetchMoreMovies = jest.fn();

  beforeEach(async () => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    const mockProps = {
      movies: movies.list,
      isLoading: false,
      isLoadingMore: false,
      onFetchMovies: mockFetchMovies,
      onFetchMoreMovies: mockFetchMoreMovies,
    };
    wrapper = mountWithStore(<ProfileMovieList {...mockProps} />);
    await act(async () => {
      jest.runAllTimers();
      wrapper.update();
    });
  });

  it('should pass movies to MovieList', () => {
    expect(wrapper.find(MovieList).prop('movies')).toBe(movies.list);
  });

  it('should call onFetchMovies prop after mounting', () => {
    expect(mockFetchMovies).toHaveBeenCalledTimes(1);
  });

  it('should not render Spinner if both isLoading and isLoadingMore are false', () => {
    expect(wrapper.exists(Spinner)).toBe(false);
  });

  it('should render Spinner when isLoading is true', async () => {
    const mockProps = {
      movies: movies.list,
      isLoading: true,
      isLoadingMore: false,
      onFetchMovies: mockFetchMovies,
      onFetchMoreMovies: mockFetchMoreMovies,
    };
    const newWrapper = mountWithStore(<ProfileMovieList {...mockProps} />);
    await act(async () => {
      jest.runAllTimers();
      newWrapper.update();
    });
    expect(newWrapper.exists(Spinner)).toBe(true);
    expect(newWrapper.exists(MovieList)).toBe(false);
  });

  it('should render both MovieList and Spinner when isLoadingMore is true', async () => {
    const mockProps = {
      movies: movies.list,
      isLoading: false,
      isLoadingMore: true,
      onFetchMovies: mockFetchMovies,
      onFetchMoreMovies: mockFetchMoreMovies,
    };
    const newWrapper = mountWithStore(<ProfileMovieList {...mockProps} />);
    await act(async () => {
      jest.runAllTimers();
      newWrapper.update();
    });
    expect(newWrapper.exists(MovieList)).toBe(true);
    expect(newWrapper.exists(Spinner)).toBe(true);
  });
});
