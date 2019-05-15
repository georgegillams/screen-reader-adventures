import { fromJS } from 'immutable';

import {
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  REQUEST_VERIFICATION_EMAIL,
  REQUEST_VERIFICATION_EMAIL_ERROR,
  REQUEST_VERIFICATION_EMAIL_SUCCESS,
} from './constants';

const initialState = fromJS({
  loggingOut: false,
  success: false,
  error: false,
  requestingVerificationEmail: false,
  requestingSuccess: false,
  requestingError: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOGOUT:
      return state.set('loggingOut', true).set('error', false);
    case LOGOUT_SUCCESS:
      return state.set('loggingOut', false).set('success', true);
    case LOGOUT_ERROR:
      return state.set('error', action.error).set('loggingOut', false);
    case REQUEST_VERIFICATION_EMAIL:
      return state
        .set('requestingVerificationEmail', true)
        .set('requestingError', false);
    case REQUEST_VERIFICATION_EMAIL_SUCCESS:
      return state
        .set('requestingVerificationEmail', false)
        .set('requestingSuccess', true);
    case REQUEST_VERIFICATION_EMAIL_ERROR:
      return state
        .set('requestingError', action.error)
        .set('requestingVerificationEmail', false);
    default:
      return state;
  }
}

export default appReducer;
