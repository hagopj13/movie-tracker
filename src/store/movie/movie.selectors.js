// @flow
import { createSelector } from 'reselect';

const selectMovie = (state) => state.movie;

const selectMovieDetails = createSelector([selectMovie], (movie) => movie.details);

const selectMovieUserState = createSelector([selectMovie], (movie) => movie.userState);

export default {
  selectMovieDetails,
  selectMovieUserState,
};
