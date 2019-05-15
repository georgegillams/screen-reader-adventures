import { fromJS } from 'immutable';

import {
  CREDENTIALS_CHANGED,
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
} from './constants';

const initialState = fromJS({
  credentials: {},
  signingUp: false,
  success: false,
  error: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case CREDENTIALS_CHANGED:
      return state.set('credentials', action.credentials);
    case SIGN_UP:
      return state.set('signingUp', true).set('error', false);
    case SIGN_UP_SUCCESS:
      return state.set('signingUp', false).set('success', true);
    case SIGN_UP_ERROR:
      return state.set('error', action.error).set('signingUp', false);
    default:
      return state;
  }
}

export default appReducer;
