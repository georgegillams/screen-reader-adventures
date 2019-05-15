import { fromJS } from 'immutable';

import {
  REGISTER_USER,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
} from './constants';

const initialState = fromJS({
  registration: null,
  registering: false,
  error: null,
  success: false,
  ticketData: null,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_USER:
      return state
        .set('registering', true)
        .set('error', false)
        .set('registration', null)
        .set('ticketData', action.ticketData)
        .set('registration', null);
    case REGISTER_USER_SUCCESS:
      return state
        .set('registering', false)
        .set('success', true)
        .set('registration', action.registration);
    case REGISTER_USER_ERROR:
      return state
        .set('error', action.error)
        .set('registering', false)
        .set(`registration`, null);
    default:
      return state;
  }
}

export default appReducer;
