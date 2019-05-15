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
  CREDENTIALS_CHANGED,
  TICKET_SELECTION_CONFIRMED,
  TICKET_TYPE_CHANGED,
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  credentials: {},
  signingUp: false,
  success: false,
  error: false,
  ticketType: null,
  loadingAvailableTickets: false,
  loadAvailableTicketsSuccess: false,
  loadAvailableTicketsError: false,
  ticketSelectionConfirmed: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case CREDENTIALS_CHANGED:
      return state.set('credentials', action.credentials);
    case TICKET_SELECTION_CONFIRMED:
      return state.set(
        'ticketSelectionConfirmed',
        action.ticketSelectionConfirmed,
      );
    case TICKET_TYPE_CHANGED:
      return state.set('ticketType', action.ticketType);
    case SIGN_UP:
      return state.set('signingUp', true).set('error', false);
    case SIGN_UP_SUCCESS:
      return state.set('signingUp', false).set('success', true);
    case SIGN_UP_ERROR:
      return state.set('error', action.error).set('signingUp', false);
    default:
      return state;
  }
}

export default appReducer;
