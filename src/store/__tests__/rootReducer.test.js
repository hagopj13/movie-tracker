import rootReducer from 'store/rootReducer';
import { initialState as authInitialState } from 'store/auth/auth.reducer';
import { initialState as apiInitialState } from 'store/api/api.reducer';
import { initialState as configInitialState } from 'store/config/config.reducer';
import { initialState as discoverInitialState } from 'store/discover/discover.reducer';
import { initialState as movieInitialState } from 'store/movie/movie.reducer';
import { initialState as searchInitialState } from 'store/search/search.reducer';
import { initialState as uiInitialState } from 'store/ui/ui.reducer';
import { initialState as upcomingInitialState } from 'store/upcoming/upcoming.reducer';
import { initialState as userInitialState } from 'store/user/user.reducer';

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
