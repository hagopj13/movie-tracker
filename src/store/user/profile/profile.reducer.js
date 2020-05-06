// @flow
import { handleActions } from 'redux-actions';

import type { Profile } from 'types';

import ProfileActionTypes from './profile.types';

type State = Profile;

export const initialState: State = {
  id: null,
  name: '',
};

const fetchProfileSuccess = (state: State, action: any): State => ({
  ...state,
  ...action.payload.profile,
});

const actionHandler = {
  [ProfileActionTypes.FETCH_PROFILE_SUCCESS]: fetchProfileSuccess,
};

export default handleActions(actionHandler, initialState);
