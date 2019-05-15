import { fromJS } from 'immutable';

import {
  USER_DETAILS_CHANGED,
  LOAD_USER_DETAILS,
  LOAD_USER_DETAILS_ERROR,
  LOAD_USER_DETAILS_SUCCESS,
  UPDATE_USER_DETAILS,
  UPDATE_USER_DETAILS_ERROR,
  UPDATE_USER_DETAILS_SUCCESS,
} from './constants';

const initialState = fromJS({
  userDetails: {},
  updatingUserDetails: false,
  success: false,
  error: false,
  loadingUserDetails: false,
  loadSuccess: false,
  loadError: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case USER_DETAILS_CHANGED:
      return state.set('userDetails', action.userDetails);
    case LOAD_USER_DETAILS:
      return state.set('loadingUserDetails', true).set('loadError', false);
    case LOAD_USER_DETAILS_SUCCESS:
      return state
        .set('loadingUserDetails', false)
        .set('loadSuccess', true)
        .set('userDetails', action.loadedUserDetails);
    case LOAD_USER_DETAILS_ERROR:
      return state
        .set('loadError', action.error)
        .set('loadingUserDetails', false);
    case UPDATE_USER_DETAILS:
      return state.set('updatingUserDetails', true).set('error', false);
    case UPDATE_USER_DETAILS_SUCCESS:
      return state.set('updatingUserDetails', false).set('success', true);
    case UPDATE_USER_DETAILS_ERROR:
      return state.set('error', action.error).set('updatingUserDetails', false);
    default:
      return state;
  }
}

export default appReducer;
