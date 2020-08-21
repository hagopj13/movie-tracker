// @flow
import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import StarRateIcon from '@material-ui/icons/StarRate';
import { red, yellow, green } from '@material-ui/core/colors';

import RatingPopover from 'components/Rating/Popover/RatingPopover';
import movieActions from 'store/movie/movie.actions';
import movieSelectors from 'store/movie/movie.selectors';
import authSelectors from 'store/auth/auth.selectors';
import dialogActions from 'store/ui/dialog/dialog.actions';
import dialogTypes from 'config/dialogTypes';
import type { Movie, MovieUserState } from 'types';

import MovieActionButton from './Button/MovieActionButton';

type Props = {
  movie: Movie,
  userState: MovieUserState,
  isAuth: boolean,
  onSetIsMovieFavorite: (id: string, isFavorite: boolean) => void,
  onSetIsMovieInWatchlist: (id: string, isInWatchlist: boolean) => void,
  onRateMovie: (id: string, rating: number | null) => void,
  onShowLoginDialog: () => void,
};

const useStyles = makeStyles((theme) => ({
  buttonsContainer: {
    '& > *': {
      marginRight: theme.spacing(1.5),
    },
  },
  favoriteIcon: {
    fontSize: 24,
    color: (props) => (props.userState.isFavorite ? red[600] : theme.palette.common.white),
  },
  watchlistIcon: {
    fontSize: 24,
    color: (props) => (props.userState.isInWatchlist ? green[500] : theme.palette.common.white),
  },
  ratingIcon: {
    fontSize: 28,
    color: (props) => (props.userState.rating ? yellow[600] : theme.palette.common.white),
  },
  tooltip: {
    fontSize: 14,
  },
}));

export const MovieActions = (props: Props) => {
  const {
    movie,
    userState,
    isAuth,
    onSetIsMovieFavorite,
    onSetIsMovieInWatchlist,
    onRateMovie,
    onShowLoginDialog,
  } = props;

  const [isRatingPopoverOpen, setIsRatingPopoverOpen] = useState(false);
  const ratingButtonRef = useRef(null);
  const classes = useStyles(props);

  const handleFavoriteButtonClick = () => {
    if (isAuth) {
      onSetIsMovieFavorite(movie.id, !userState.isFavorite);
    } else {
      onShowLoginDialog();
    }
  };

  const handleWatchlistButtonClick = () => {
    if (isAuth) {
      onSetIsMovieInWatchlist(movie.id, !userState.isInWatchlist);
    } else {
      onShowLoginDialog();
    }
  };

  const handleRatingButtonClick = () => {
    if (isAuth) {
      setIsRatingPopoverOpen(true);
    } else {
      onShowLoginDialog();
    }
  };

  const handleRatingPopoverClose = () => setIsRatingPopoverOpen(false);

  const handleRatingChange = (newValue: number | null) => {
    onRateMovie(movie.id, newValue);
  };

  const getFavoriteTooltipTitle = () => {
    if (!isAuth) {
      return 'Login to add movie to your favorite list';
    }
    if (userState.isFavorite) {
      return 'Remove movie from your favorite list';
    }
    return 'Add movie to your favorite list';
  };

  const getWatchlistTooltipTitle = () => {
    if (!isAuth) {
      return 'Login to add movie to your watchlist';
    }
    if (userState.isInWatchlist) {
      return 'Remove movie from your watchlist';
    }
    return 'Add movie to your watchlist';
  };

  const getRateTooltipTitle = () => {
    if (!isAuth) {
      return 'Login to rate movie';
    }
    if (userState.rating) {
      return `Rated ${userState.rating}`;
    }
    return 'Rate movie';
  };

  return (
    <>
      <div className={classes.buttonsContainer}>
        <MovieActionButton onClick={handleFavoriteButtonClick} title={getFavoriteTooltipTitle()}>
          <FavoriteIcon className={classes.favoriteIcon} />
        </MovieActionButton>
        <MovieActionButton onClick={handleWatchlistButtonClick} title={getWatchlistTooltipTitle()}>
          <BookmarkIcon className={classes.watchlistIcon} />
        </MovieActionButton>
        <MovieActionButton
          ref={ratingButtonRef}
          onClick={handleRatingButtonClick}
          title={getRateTooltipTitle()}
        >
          <StarRateIcon className={classes.ratingIcon} />
        </MovieActionButton>
      </div>
      <RatingPopover
        isOpen={isRatingPopoverOpen}
        anchorEl={ratingButtonRef.current}
        initialValue={userState.rating}
        onClose={handleRatingPopoverClose}
        onChange={handleRatingChange}
      />
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  userState: movieSelectors.selectMovieUserState,
  isAuth: authSelectors.selectIsAuth,
});

const mapDispatchToProps = {
  onSetIsMovieFavorite: movieActions.setIsMovieFavorite,
  onSetIsMovieInWatchlist: movieActions.setIsMovieInWatchlist,
  onRateMovie: movieActions.rateMovie,
  onShowLoginDialog: () => dialogActions.showDialog(dialogTypes.LOGIN),
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieActions);
