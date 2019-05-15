import {
  REGISTER_USER,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
} from './constants';

export function registerUser(ticketData) {
  return {
    type: REGISTER_USER,
    ticketData,
  };
}

export function registerUserSuccess(registration) {
  return {
    type: REGISTER_USER_SUCCESS,
    registration,
  };
}

export function registerUserError(error) {
  return {
    type: REGISTER_USER_ERROR,
    error,
  };
}
