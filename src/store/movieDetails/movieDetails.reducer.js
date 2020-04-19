// @flow
import { handleActions } from 'redux-actions';

import MovieDetailsActionTypes from './movieDetails.types';

export type MovieDetails = {
  id: string,
  title: string,
};

type State = MovieDetails | null;

const initialState: MovieDetails = null;

const convertResponseToMovieDetails = (response: any): MovieDetails => ({
  id: response.id,
  title: response.title,
});

const fetchMovieDetailsStart = () => null;

// TODO
const fetchMovieDetailsSuccess = (state: State, action) =>
  convertResponseToMovieDetails(action.payload.data);

const movieDetailsActionHandler = {
  [MovieDetailsActionTypes.FETCH_MOVIE_DETAILS_START]: fetchMovieDetailsStart,
  [MovieDetailsActionTypes.FETCH_MOVIE_DETAILS_SUCCESS]: fetchMovieDetailsSuccess,
};

export default handleActions(movieDetailsActionHandler, initialState);
