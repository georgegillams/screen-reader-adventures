import { fromJS } from 'immutable';

import {
  LOAD_BALANCE,
  LOAD_BALANCE_SUCCESS,
  LOAD_BALANCE_ERROR,
  LOAD_USER_TICKET,
  LOAD_USER_TICKET_SUCCESS,
  LOAD_USER_TICKET_ERROR,
} from './constants';

const initialState = fromJS({
  loadingBalance: false,
  loadBalanceSuccess: false,
  loadBalanceError: false,
  loadingUserTicket: false,
  loadUserTicketSuccess: false,
  loadUserTicketError: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_BALANCE:
      return state.set('loadingBalance', true).set('loadBalanceError', false);
    case LOAD_BALANCE_SUCCESS:
      console.log(`red, loadB_SUCCESS`);
      return state
        .set('loadingBalance', false)
        .set('loadBalanceSuccess', true)
        .set('balance', action.balance);
    case LOAD_BALANCE_ERROR:
      return state
        .set('loadBalanceError', action.error)
        .set('loadingBalance', false);
    case LOAD_USER_TICKET:
      return state
        .set('loadingUserTicket', true)
        .set('loadUserTicketError', false);
    case LOAD_USER_TICKET_SUCCESS:
      return state
        .set('loadingUserTicket', false)
        .set('loadUserTicketSuccess', true)
        .set('userTicket', action.ticket);
    case LOAD_USER_TICKET_ERROR:
      return state
        .set('loadUserTicketError', action.error)
        .set('loadingUserTicket', false);
    default:
      return state;
  }
}

export default appReducer;
