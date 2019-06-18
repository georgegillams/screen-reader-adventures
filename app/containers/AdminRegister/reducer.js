import { fromJS } from 'immutable';

import {
  LOAD_REGISTER,
  LOAD_REGISTER_ERROR,
  LOAD_REGISTER_SUCCESS,
} from './constants';

const initialState = fromJS({});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REGISTER:
      return state.set('loading', true).set('error', false);
    case LOAD_REGISTER_SUCCESS:
      return state
        .set('loading', false)
        .set('success', true)
        .set('register', action.register);
    case LOAD_REGISTER_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default appReducer;
