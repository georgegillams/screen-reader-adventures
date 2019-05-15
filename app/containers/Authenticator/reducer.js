import { fromJS } from 'immutable';

import {
  SESSION_KEY_CHANGED,
  REAUTHENTICATE,
  REAUTHENTICATE_ERROR,
  REAUTHENTICATE_SUCCESS,
} from './constants';

const initialState = fromJS({
  reauthenticating: false,
  success: false,
  error: null,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SESSION_KEY_CHANGED:
      return state.set('sessionKey', action.sessionKey);
    case REAUTHENTICATE:
      return state.set('reauthenticating', true).set('error', false);
    case REAUTHENTICATE_SUCCESS:
      return state.set('reauthenticating', false).set('success', true);
    case REAUTHENTICATE_ERROR:
      return state.set('error', action.error).set('reauthenticating', false);
    default:
      return state;
  }
}

export default appReducer;
