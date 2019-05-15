import { fromJS } from 'immutable';

import {
  TOKEN_CHANGED,
  VERIFY,
  VERIFY_SUCCESS,
  VERIFY_ERROR,
} from './constants';

const initialState = fromJS({
  token: null,
  verifying: false,
  error: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case TOKEN_CHANGED:
      return state.set('token', action.token);
    case VERIFY:
      return state.set('verifying', true).set('error', false);
    case VERIFY_SUCCESS:
      return state.set('verifying', false).set(`success`, true);
    case VERIFY_ERROR:
      return state.set('error', action.error).set('verifying', false);
    default:
      return state;
  }
}

export default appReducer;
