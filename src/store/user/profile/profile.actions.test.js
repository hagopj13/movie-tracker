import profileActions from './profile.actions';
import ProfileActionTypes from './profile.types';

describe('Profile action creators', () => {
  describe('fetchProfile action creator', () => {
    it('should create the fetchProfile action', () => {
      const action = profileActions.fetchProfile();
      expect(action.type).toBe(ProfileActionTypes.FETCH_PROFILE);
    });
  });

  describe('fetchProfileStart action creator', () => {
    it('should create the fetchProfileStart action', () => {
      const action = profileActions.fetchProfileStart();
      expect(action.type).toBe(ProfileActionTypes.FETCH_PROFILE_START);
    });
  });

  describe('fetchProfileSuccess action creator', () => {
    it('should create the fetchProfileSuccess action', () => {
      const profile = { id: 'someId', name: 'someName' };
      const action = profileActions.fetchProfileSuccess(profile);
      expect(action.type).toBe(ProfileActionTypes.FETCH_PROFILE_SUCCESS);
      expect(action.payload).toEqual({ profile });
    });
  });

  describe('fetchProfileFailure action creator', () => {
    it('should create the fetchProfileFailure action', () => {
      const error = 'some error message';
      const action = profileActions.fetchProfileFailure(error);
      expect(action.type).toBe(ProfileActionTypes.FETCH_PROFILE_FAILURE);
      expect(action.payload).toEqual({ error });
    });
  });
});
