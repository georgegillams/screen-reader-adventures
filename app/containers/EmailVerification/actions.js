import {
  TOKEN_CHANGED,
  VERIFY,
  VERIFY_SUCCESS,
  VERIFY_ERROR,
} from './constants';

export function tokenChanged(newValue) {
  return {
    type: TOKEN_CHANGED,
    token: newValue,
  };
}

export function verify() {
  return {
    type: VERIFY,
  };
}

export function verifySuccessful() {
  return {
    type: VERIFY_SUCCESS,
  };
}

export function verifyError(error) {
  return {
    type: VERIFY_ERROR,
    error,
  };
}
