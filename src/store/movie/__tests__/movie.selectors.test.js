import movieSelectors from 'store/movie/movie.selectors';
import movie, { details, userState } from 'store/fixtures/movie';

describe('Movie selectors', () => {
  describe('selectMovieDetails', () => {
    it('should return the movie details', () => {
      const currentState = { movie };
      const selectedMovieDetails = movieSelectors.selectMovieDetails(currentState);
      expect(selectedMovieDetails).toEqual(details);
    });
  });

  describe('selectMovieUserState', () => {
    it('should return the movie user state', () => {
      const currentState = { movie };
      const selectedMovieUserState = movieSelectors.selectMovieUserState(currentState);
      expect(selectedMovieUserState).toEqual(userState);
    });
  });
});
