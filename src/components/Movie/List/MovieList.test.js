import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import Typography from '@material-ui/core/Typography';

import movies from 'store/fixtures/movies';
import InfiniteScroll from 'components/InfiniteScroll/InfiniteScroll';

import MovieList from './MovieList';
import MovieListItem from './Item/MovieListItem';

describe('MovieList component', () => {
  let shallow;
  let wrapper;

  const mockLoadMore = jest.fn();

  beforeAll(() => {
    shallow = createShallow();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    const mockProps = {
      movies: movies.list,
      onLoadMore: mockLoadMore,
    };
    wrapper = shallow(<MovieList {...mockProps} />);
  });

  it('should render the MovieList component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render MovieListItem for each movie', () => {
    expect(wrapper.find(MovieListItem)).toHaveLength(movies.list.length);
    expect(wrapper.find(MovieListItem).at(0).prop('movie')).toBe(movies.list[0]);
  });

  it('should render the movies inside InfiniteScroll if onLoadMore is defined', () => {
    expect(wrapper.exists(InfiniteScroll)).toBe(true);
  });

  it('should call onLoadMore when onLoadMore is called on InfiniteScroll', () => {
    wrapper.find(InfiniteScroll).prop('onLoadMore')();
    expect(mockLoadMore).toHaveBeenCalledTimes(1);
  });

  it('should render a message when no movies are found', () => {
    const mockProps = {
      movies: [],
      onLoadMore: mockLoadMore,
    };
    const newWrapper = shallow(<MovieList {...mockProps} />);
    expect(newWrapper.exists(Typography)).toBe(true);
  });

  it('should not render InfiniteScroll but still render the movies when onLoadMore is not defined', () => {
    const mockProps = {
      movies: movies.list,
      onLoadMore: null,
    };
    const newWrapper = shallow(<MovieList {...mockProps} />);
    expect(newWrapper.exists(InfiniteScroll)).toBe(false);
    expect(wrapper.find(MovieListItem)).toHaveLength(movies.list.length);
  });
});
