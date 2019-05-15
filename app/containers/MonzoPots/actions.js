import { LOAD_MONZO, LOAD_MONZO_SUCCESS, LOAD_MONZO_ERROR } from './constants';

export function loadMonzo(password) {
  return {
    type: LOAD_MONZO,
    password,
  };
}

export function monzoLoadSuccess(monzoPots) {
  return {
    type: LOAD_MONZO_SUCCESS,
    monzoPots,
  };
}

export function monzoLoadError(error) {
  return {
    type: LOAD_MONZO_ERROR,
    error,
  };
}
