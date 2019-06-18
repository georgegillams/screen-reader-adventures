import { fromJS } from 'immutable';

import {
  REQUEST_MAGIC_LINK_FOR_USER,
  RESEND_PAYMENT_RECEIPT,
  SEND_TICKET_EMAIL,
  LOAD_USERS,
  LOAD_USERS_ERROR,
  LOAD_USERS_SUCCESS,
} from './constants';

const initialState = fromJS({
  magicLinkUser: null,
  loading: false,
  error: null,
  success: false,
  users: null,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_MAGIC_LINK_FOR_USER:
      return state.set('magicLinkUser', action.magicLinkUser);
    case RESEND_PAYMENT_RECEIPT:
      return state.set('paymentReceiptUser', action.paymentReceiptUser);
    case SEND_TICKET_EMAIL:
      return state.set('emailTicketUser', action.emailTicketUser);
    case LOAD_USERS:
      return state.set('loading', true).set('error', false);
    case LOAD_USERS_SUCCESS:
      return state
        .set('loading', false)
        .set('success', true)
        .set('users', action.users);
    case LOAD_USERS_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default appReducer;
