import { LOAD_PC, LOAD_PC_SUCCESS, LOAD_PC_ERROR } from './constants';

export function loadPC() {
  return {
    type: LOAD_PC,
  };
}

export function loadPCSuccess(pc) {
  return {
    type: LOAD_PC_SUCCESS,
    pc,
  };
}

export function loadPcError(error) {
  return {
    type: LOAD_PC_ERROR,
    error,
  };
}
