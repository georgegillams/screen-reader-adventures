import {
  CREDENTIALS_CHANGED,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from './constants';

export function credentialsChanged(newValue) {
  return {
    type: CREDENTIALS_CHANGED,
    credentials: newValue,
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
