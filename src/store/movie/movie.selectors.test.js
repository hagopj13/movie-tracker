import movieState, { details, userState } from 'store/fixtures/movie';

import movieSelectors from './movie.selectors';

describe('Movie selectors', () => {
  describe('selectMovieDetails', () => {
    it('should return the movie details', () => {
      const currentState = { movie: movieState };
      const selectedMovieDetails = movieSelectors.selectMovieDetails(currentState);
      expect(selectedMovieDetails).toEqual(details);
    });
  });

  describe('selectMovieUserState', () => {
    it('should return the movie user state', () => {
      const currentState = { movie: movieState };
      const selectedMovieUserState = movieSelectors.selectMovieUserState(currentState);
      expect(selectedMovieUserState).toEqual(userState);
    });
  });
});
