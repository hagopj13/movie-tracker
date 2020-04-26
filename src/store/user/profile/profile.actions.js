// @flow
import ProfileActionTypes from './profile.types';

const fetchProfile = () => ({
  type: ProfileActionTypes.FETCH_PROFILE,
});

const fetchProfileStart = () => ({
  type: ProfileActionTypes.FETCH_PROFILE_START,
});

const fetchProfileSuccess = (data: any) => ({
  type: ProfileActionTypes.FETCH_PROFILE_SUCCESS,
  payload: { data },
});

const fetchProfileFailure = (error: string) => ({
  type: ProfileActionTypes.FETCH_PROFILE_FAILURE,
  payload: { error },
});

export default {
  fetchProfile,
  fetchProfileStart,
  fetchProfileSuccess,
  fetchProfileFailure,
};
