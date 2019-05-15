import { TOKEN_CHANGED, LOGIN, LOGIN_SUCCESS, LOGIN_ERROR } from './constants';

export function tokenChanged(newValue) {
  return {
    type: TOKEN_CHANGED,
    token: newValue,
  };
}

export function login() {
  return {
    type: LOGIN,
  };
}

export function loginSuccessful() {
  return {
    type: LOGIN_SUCCESS,
  };
}

export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error,
  };
}
