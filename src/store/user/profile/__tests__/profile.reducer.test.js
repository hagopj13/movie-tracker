import profileReducer from 'store/user/profile/profile.reducer';
import ProfileActionTypes from 'store/user/profile/profile.types';

const initialState = {
  id: null,
  name: '',
};

describe('Profile reducer', () => {
  it('should return the initial state', () => {
    const state = profileReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });

  it('should set the state on fetchProfileSuccess action', () => {
    const profile = { id: 'someId', name: 'someName' };
    const action = {
      type: ProfileActionTypes.FETCH_PROFILE_SUCCESS,
      payload: { profile },
    };
    const state = profileReducer(initialState, action);
    expect(state).toEqual(profile);
  });
});
