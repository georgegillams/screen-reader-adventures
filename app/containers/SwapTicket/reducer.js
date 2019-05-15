/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  TICKET_TYPE_CHANGED,
  SWAP_TICKETS,
  SWAP_TICKETS_SUCCESS,
  SWAP_TICKETS_ERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  ticketType: null,
  loadingAvailableTickets: false,
  loadAvailableTicketsSuccess: false,
  loadAvailableTicketsError: false,
  swappingTickets: false,
  swappTicketsSuccess: false,
  swappTicketsError: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case TICKET_TYPE_CHANGED:
      return state.set('ticketType', action.ticketType);
    case SWAP_TICKETS:
      return state.set('swappingTickets', true).set('ticketSwapError', false);
    case SWAP_TICKETS_SUCCESS:
      return state
        .set('swappingTickets', false)
        .set('ticketSwappingSuccess', true)
        .set('newTicket', action.newTicket);
    case SWAP_TICKETS_ERROR:
      return state
        .set('ticketSwapError', action.error)
        .set('swappingTickets', false);
    default:
      return state;
  }
}

export default appReducer;
