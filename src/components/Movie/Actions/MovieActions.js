// @flow
import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Popover from '@material-ui/core/Popover';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import StarRateIcon from '@material-ui/icons/StarRate';
import { lightBlue, red, yellow, green } from '@material-ui/core/colors';

import DialogTypes from 'components/Dialog/types';
import movieActions from 'store/movie/movie.actions';
import movieSelectors from 'store/movie/movie.selectors';
import authSelectors from 'store/auth/auth.selectors';
import dialogActions from 'store/ui/dialog/dialog.actions';
import { MovieDetails, MovieUserState } from 'types';

type Props = {
  movie: MovieDetails,
  userState: MovieUserState,
  isAuth: boolean,
  onSetIsMovieFavorite: (id: string, isFavorite: boolean) => void,
  onSetIsMovieInWatchlist: (id: string, isInWatchlist: boolean) => void,
  onRateMovie: (id: string, rating: number | null) => void,
  onShowDialog: () => void,
};

const useStyles = makeStyles((theme) => ({
  fab: {
    marginRight: theme.spacing(1.5),
    backgroundColor: lightBlue[800],
    '&:hover': {
      backgroundColor: lightBlue[900],
    },
  },
  favoriteIcon: {
    fontSize: 24,
    color: (props) => (props.userState.isFavorite ? red[600] : 'white'),
  },
  watchlistIcon: {
    fontSize: 24,
    color: (props) => (props.userState.isInWatchlist ? green[500] : 'white'),
  },
  ratingIcon: {
    fontSize: 28,
    color: (props) => (props.userState.rating ? yellow[600] : 'white'),
  },
  ratingContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1.5),
    width: 165,
  },
}));

const MovieActions = (props: Props) => {
  const {
    movie,
    userState,
    isAuth,
    onSetIsMovieFavorite,
    onSetIsMovieInWatchlist,
    onRateMovie,
    onShowDialog,
  } = props;

  const [isRatingPopoverOpen, setIsRatingPopoverOpen] = useState(false);
  const [ratingValue, setRatingValue] = useState(userState.rating);
  const [ratingHoverValue, setRatingHoverValue] = useState(-1);

  const ratingButtonRef = useRef(null);
  const classes = useStyles(props);

  const showLoginDialog = () => onShowDialog(DialogTypes.LOGIN);

  const handleFavoriteButtonClick = () => {
    if (isAuth) {
      onSetIsMovieFavorite(movie.id, !userState.isFavorite);
    } else {
      showLoginDialog();
    }
  };

  const handleWatchlistButtonClick = () => {
    if (isAuth) {
      onSetIsMovieInWatchlist(movie.id, !userState.isInWatchlist);
    } else {
      showLoginDialog();
    }
  };

  const handleRatingButtonClick = () => {
    if (isAuth) {
      setIsRatingPopoverOpen(true);
    } else {
      showLoginDialog();
    }
  };

  const handleRatingPopoverClose = () => setIsRatingPopoverOpen(false);

  const handleRatingChange = (event, newValue: number | null) => {
    setRatingValue(newValue);
    onRateMovie(movie.id, newValue);
  };

  const handleRatingChangeActive = (event, newHover: number) => setRatingHoverValue(newHover);

  return (
    <div>
      <Fab className={classes.fab} size="medium" onClick={handleFavoriteButtonClick}>
        <FavoriteIcon className={classes.favoriteIcon} />
      </Fab>
      <Fab className={classes.fab} size="medium" onClick={handleWatchlistButtonClick}>
        <BookmarkIcon className={classes.watchlistIcon} />
      </Fab>
      <Fab
        className={classes.fab}
        size="medium"
        onClick={handleRatingButtonClick}
        ref={ratingButtonRef}
      >
        <StarRateIcon className={classes.ratingIcon} />
      </Fab>
      <Popover
        open={isRatingPopoverOpen}
        anchorEl={ratingButtonRef.current}
        onClose={handleRatingPopoverClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: -10, horizontal: 'center' }}
        disableScrollLock
      >
        <div className={classes.ratingContainer}>
          <Rating
            name="rating"
            value={ratingValue}
            precision={0.5}
            onChange={handleRatingChange}
            onChangeActive={handleRatingChangeActive}
          />
          <Box ml={1}>{ratingHoverValue !== -1 ? ratingHoverValue : ratingValue}</Box>
        </div>
      </Popover>
    </div>
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
  onShowDialog: dialogActions.showDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieActions);
