import { fromJS } from 'immutable';

import { TOKEN_CHANGED, LOGIN, LOGIN_SUCCESS, LOGIN_ERROR } from './constants';

const initialState = fromJS({
  token: null,
  loggingIn: false,
  success: false,
  error: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case TOKEN_CHANGED:
      return state.set('token', action.token);
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
