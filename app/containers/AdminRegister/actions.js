import {
  LOAD_REGISTER,
  LOAD_REGISTER_SUCCESS,
  LOAD_REGISTER_ERROR,
} from './constants';

export function loadRegister() {
  return {
    type: LOAD_REGISTER,
  };
}

export function loadRegisterSuccess(register) {
  return {
    type: LOAD_REGISTER_SUCCESS,
    register,
  };
}

export function loadRegisterError(error) {
  return {
    type: LOAD_REGISTER_ERROR,
    error,
  };
}
