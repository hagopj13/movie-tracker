// @flow
import type { Profile } from 'types';

import ProfileActionTypes from './profile.types';

const fetchProfile = () => ({
  type: ProfileActionTypes.FETCH_PROFILE,
});

const fetchProfileStart = () => ({
  type: ProfileActionTypes.FETCH_PROFILE_START,
});

const fetchProfileSuccess = (profile: Profile) => ({
  type: ProfileActionTypes.FETCH_PROFILE_SUCCESS,
  payload: { profile },
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
