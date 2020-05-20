import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';

import { details as movie } from 'store/fixtures/movie';
import RatingPopover from 'components/Rating/Popover/RatingPopover';

import { MovieActions } from './MovieActions';
import MovieActionButton from './Button/MovieActionButton';

describe('MovieActions component', () => {
  let shallow;
  let userState;
  let wrapper;

  const mockSetIsMovieFavorite = jest.fn();
  const mockSetIsMovieInWatchlist = jest.fn();
  const mockRateMovie = jest.fn();
  const mockShowLoginDialog = jest.fn();

  beforeAll(() => {
    shallow = createShallow();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('isAuth is true', () => {
    beforeEach(() => {
      userState = {
        isFavorite: false,
        isInWatchlist: false,
        rating: null,
      };
      const mockProps = {
        movie,
        userState,
        isAuth: true,
        onSetIsMovieFavorite: mockSetIsMovieFavorite,
        onSetIsMovieInWatchlist: mockSetIsMovieInWatchlist,
        onRateMovie: mockRateMovie,
        onShowLoginDialog: mockShowLoginDialog,
      };
      wrapper = shallow(<MovieActions {...mockProps} />);
    });

    it('should render the MovieActions component correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should call onSetIsMovieFavorite when the favorite button is clicked', () => {
      wrapper.find(MovieActionButton).at(0).simulate('click');
      expect(mockSetIsMovieFavorite).toHaveBeenCalledTimes(1);
      expect(mockSetIsMovieFavorite).toHaveBeenLastCalledWith(movie.id, !userState.isFavorite);
    });

    it('should call onSetIsMovieInWatchlist when the watchlist button is clicked', () => {
      wrapper.find(MovieActionButton).at(1).simulate('click');
      expect(mockSetIsMovieInWatchlist).toHaveBeenCalledTimes(1);
      expect(mockSetIsMovieInWatchlist).toHaveBeenLastCalledWith(
        movie.id,
        !userState.isInWatchlist,
      );
    });

    it('should initially have the RatingPopover closed', () => {
      expect(wrapper.find(RatingPopover).prop('isOpen')).toBe(false);
    });

    it('should open the RatingPopover when the rating button is clicked', () => {
      wrapper.find(MovieActionButton).at(2).simulate('click');
      expect(wrapper.find(RatingPopover).prop('isOpen')).toBe(true);
    });

    it('should close the RatingPopover when its onClose prop is called', () => {
      wrapper.find(MovieActionButton).at(2).simulate('click');
      wrapper.find(RatingPopover).prop('onClose')();
      expect(wrapper.find(RatingPopover).prop('isOpen')).toBe(false);
    });

    it('should call onRateMovie when RatingPopover onChange is clicked', () => {
      const newRating = 5;
      wrapper.find(RatingPopover).prop('onChange')(newRating);
      expect(mockRateMovie).toHaveBeenCalledTimes(1);
      expect(mockRateMovie).toHaveBeenLastCalledWith(movie.id, newRating);
    });
  });

  describe('isAuth is false', () => {
    beforeEach(() => {
      userState = {
        isFavorite: false,
        isInWatchlist: false,
        rating: null,
      };
      const mockProps = {
        movie,
        userState,
        isAuth: false,
        onSetIsMovieFavorite: mockSetIsMovieFavorite,
        onSetIsMovieInWatchlist: mockSetIsMovieInWatchlist,
        onRateMovie: mockRateMovie,
        onShowLoginDialog: mockShowLoginDialog,
      };
      wrapper = shallow(<MovieActions {...mockProps} />);
    });

    it('should render the MovieActions component correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should open the login dialog when favorite button is clicked', () => {
      wrapper.find(MovieActionButton).at(0).simulate('click');
      expect(mockShowLoginDialog).toHaveBeenCalledTimes(1);
    });

    it('should open the login dialog when the watchlist button is clicked', () => {
      wrapper.find(MovieActionButton).at(1).simulate('click');
      expect(mockShowLoginDialog).toHaveBeenCalledTimes(1);
    });

    it('should open the login dialog when the rating button is clicked', () => {
      wrapper.find(MovieActionButton).at(2).simulate('click');
      expect(mockShowLoginDialog).toHaveBeenCalledTimes(1);
    });
  });
});
