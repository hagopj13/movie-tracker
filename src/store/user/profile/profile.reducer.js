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

const fetchProfileStart = () => initialState;

const fetchProfileSuccess = (state: State, action: any): State => ({
  ...state,
  id: action.data.id,
  name: action.data.username,
});

const actionHandler = {
  [ProfileActionTypes.FETCH_PROFILE_START]: fetchProfileStart,
  [ProfileActionTypes.FETCH_PROFILE_SUCCESS]: fetchProfileSuccess,
};

export default handleActions(actionHandler, initialState);
