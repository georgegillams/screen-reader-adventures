import { fromJS } from 'immutable';

import {
  CREDENTIALS_CHANGED,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from './constants';

const initialState = fromJS({
  credentials: {},
  loggingIn: false,
  error: false,
}).set('credentials', { useMagicLink: true });

function appReducer(state = initialState, action) {
  switch (action.type) {
    case CREDENTIALS_CHANGED:
      return state.set('credentials', action.credentials);
    case LOGIN:
      return state.set('loggingIn', true).set('error', false);
    case LOGIN_SUCCESS:
      return state.set('loggingIn', false).set('success', true);
    case LOGIN_ERROR:
      return state.set('error', action.error).set('loggingIn', false);
    default:
      return state;
  }
}

export default appReducer;
