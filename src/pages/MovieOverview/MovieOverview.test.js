import React from 'react';
import { useParams } from 'react-router-dom';
import { createShallow } from '@material-ui/core/test-utils';
import Typography from '@material-ui/core/Typography';

import { mountWithStore } from 'testUtils';
import { details as movie } from 'store/fixtures/movie';
import Spinner from 'components/Spinner/Spinner';

import { MovieOverview } from './MovieOverview';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe('MovieOverview page', () => {
  let shallow;
  let wrapper;

  const mockFetchMovie = jest.fn();
  const mockUpdateMovieUserState = jest.fn();

  beforeAll(() => {
    shallow = createShallow();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the MovieOverview page correctly', () => {
    useParams.mockReturnValue({ id: movie.id });
    const mockProps = {
      isLoading: false,
      movie,
      isAuth: true,
      onFetchMovie: mockFetchMovie,
      onUpdateMovieUserState: mockUpdateMovieUserState,
    };
    wrapper = shallow(<MovieOverview {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call onFetchMovie if movie id is defined', () => {
    useParams.mockReturnValue({ id: movie.id });
    const mockProps = {
      isLoading: false,
      movie,
      isAuth: true,
      onFetchMovie: mockFetchMovie,
      onUpdateMovieUserState: mockUpdateMovieUserState,
    };
    wrapper = mountWithStore(<MovieOverview {...mockProps} />);
    expect(mockFetchMovie).toHaveBeenCalledTimes(1);
    expect(mockFetchMovie).toHaveBeenLastCalledWith(movie.id);
  });

  it('should not call onFetchMovie if movie id is not defined', () => {
    useParams.mockReturnValue({ id: null });
    const mockProps = {
      isLoading: false,
      movie,
      isAuth: true,
      onFetchMovie: mockFetchMovie,
      onUpdateMovieUserState: mockUpdateMovieUserState,
    };
    wrapper = mountWithStore(<MovieOverview {...mockProps} />);
    expect(mockFetchMovie).not.toHaveBeenCalled();
  });

  it('should render Spinner when isLoading is true', () => {
    useParams.mockReturnValue({ id: movie.id });
    const mockProps = {
      isLoading: true,
      movie,
      isAuth: true,
      onFetchMovie: mockFetchMovie,
      onUpdateMovieUserState: mockUpdateMovieUserState,
    };
    wrapper = shallow(<MovieOverview {...mockProps} />);
    expect(wrapper.exists(Spinner)).toBe(true);
  });

  it('should render not found text when movie is null', () => {
    useParams.mockReturnValue({ id: movie.id });
    const mockProps = {
      isLoading: false,
      movie: null,
      isAuth: true,
      onFetchMovie: mockFetchMovie,
      onUpdateMovieUserState: mockUpdateMovieUserState,
    };
    wrapper = shallow(<MovieOverview {...mockProps} />);
    expect(wrapper.exists(Typography)).toBe(true);
  });
});
