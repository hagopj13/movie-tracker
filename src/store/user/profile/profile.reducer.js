// @flow
import { handleActions } from 'redux-actions';

import ProfileActionTypes from './profile.types';

type State = {
  id: string | null,
  name: string,
};

const initialState: State = {
  id: null,
  name: '',
};

const fetchProfileSuccess = (state: State, action: any): State => ({
  ...state,
  id: action.payload.data.id,
  name: action.payload.data.username,
});

const actionHandler = {
  [ProfileActionTypes.FETCH_PROFILE_SUCCESS]: fetchProfileSuccess,
};

export default handleActions(actionHandler, initialState);
