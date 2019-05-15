import { fromJS } from 'immutable';

import { LOAD_PC, LOAD_PC_SUCCESS, LOAD_PC_ERROR } from './constants';

const initialState = fromJS({
  pc: null,
  loadingPC: false,
  loadPCSuccess: false,
  loadPCError: null,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PC:
      return state.set('loadingPC', true).set('loadPcError', false);
    case LOAD_PC_SUCCESS:
      return state
        .set('loadingPC', false)
        .set('loadPCSuccess', true)
        .set('pc', action.pc);
    case LOAD_PC_ERROR:
      return state.set('loadPcError', action.error).set('loadingPC', false);
    default:
      return state;
  }
}

export default appReducer;
