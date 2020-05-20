import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';

import movies from 'store/fixtures/movies';
import MoviePoster from 'components/Movie/Poster/MoviePoster';

import MovieListItem from './MovieListItem';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('MovieListItem component', () => {
  let shallow;
  let movie;
  let wrapper;

  beforeAll(() => {
    shallow = createShallow();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    [movie] = movies.list;
    const mockProps = {
      movie,
    };
    wrapper = shallow(<MovieListItem {...mockProps} />);
  });

  it('should render the MovieListItem component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the movie title', () => {
    expect(wrapper.find(Typography).at(0).text()).toBe(movie.title);
  });

  it('should pass the posterPath to MoviePoster', () => {
    expect(wrapper.find(MoviePoster).prop('posterPath')).toBe(movie.posterPath);
  });

  it('should render Rating if voteCount is greater than 0', () => {
    expect(wrapper.exists(Rating)).toBe(true);
  });

  it('should push the correct url to history when movie is clicked', () => {
    wrapper.find(Card).simulate('click');
    expect(mockHistoryPush).toHaveBeenCalledTimes(1);
    expect(mockHistoryPush).toHaveBeenLastCalledWith(`/movies/${movie.id}`);
  });
});
