import { fromJS } from 'immutable';
import cookie from 'react-cookies';

import {
  SET_LOGIN_REDIRECT,
  SET_USER,
  SET_USER_LOADING,
  SET_COOKIES_ALLOWED,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  user: null,
  userLoading: false,
  cookiesAllowed: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_LOADING:
      return state.set('userLoading', true);
    case SET_USER:
      if (state.get('cookiesAllowed')) {
        if (action.user && action.user.session) {
          cookie.save('session', action.user.session, {
            path: '/',
            expires: new Date(Date.now() + 24 * 60 * 60 * 100 * 1000),
          });
        }
      }
      return state.set('userLoading', false).set(`user`, action.user);
    case SET_COOKIES_ALLOWED:
      if (action.cookiesAllowed === undefined) {
        return state;
      }
      if (action.cookiesAllowed && !cookie.load(`session`)) {
        cookie.save('session', 'cookies-allowed', {
          path: '/',
          expires: new Date(Date.now() + 24 * 60 * 60 * 100 * 1000),
        });
      }
      return state.set('cookiesAllowed', action.cookiesAllowed);
    case SET_LOGIN_REDIRECT:
      return state.set('loginRedirect', action.loginRedirect);
    default:
      return state;
  }
}

export default appReducer;
