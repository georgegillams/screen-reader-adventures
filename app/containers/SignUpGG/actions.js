import {
  CREDENTIALS_CHANGED,
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
} from './constants';

export function credentialsChanged(newValue) {
  return {
    type: CREDENTIALS_CHANGED,
    credentials: newValue,
  };
}

export function signUp() {
  return {
    type: SIGN_UP,
  };
}

export function signUpSuccessful() {
  return {
    type: SIGN_UP_SUCCESS,
  };
}

export function signUpError(error) {
  return {
    type: SIGN_UP_ERROR,
    error,
  };
}
