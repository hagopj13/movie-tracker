import upcomingReducer from 'store/upcoming/upcoming.reducer';
import { defaultInitialState as moviesInitialState } from 'store/common/movies/movies.reducer';

describe('Upcoming reducer', () => {
  it('should return the initial state', () => {
    const state = upcomingReducer(undefined, { type: '@@INIT' });
    expect(state).toBeDefined();
    expect(state.movies).toEqual(moviesInitialState);
  });
});
