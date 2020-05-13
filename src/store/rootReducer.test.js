import rootReducer from './rootReducer';
import { initialState as authInitialState } from './auth/auth.reducer';
import { initialState as apiInitialState } from './api/api.reducer';
import { initialState as configInitialState } from './config/config.reducer';
import { initialState as discoverInitialState } from './discover/discover.reducer';
import { initialState as movieInitialState } from './movie/movie.reducer';
import { initialState as searchInitialState } from './search/search.reducer';
import { initialState as uiInitialState } from './ui/ui.reducer';
import { initialState as upcomingInitialState } from './upcoming/upcoming.reducer';
import { initialState as userInitialState } from './user/user.reducer';

describe('Root reducer', () => {
  it('should return the initial state', () => {
    const state = rootReducer(undefined, { type: '@@INIT' });
    expect(state).toBeDefined();
    expect(state.auth).toEqual(authInitialState);
    expect(state.api).toEqual(apiInitialState);
    expect(state.config).toEqual(configInitialState);
    expect(state.discover).toEqual(discoverInitialState);
    expect(state.movie).toEqual(movieInitialState);
    expect(state.search).toEqual(searchInitialState);
    expect(state.ui).toEqual(uiInitialState);
    expect(state.upcoming).toEqual(upcomingInitialState);
    expect(state.user).toEqual(userInitialState);
  });
});
