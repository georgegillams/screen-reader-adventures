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
  LOAD_AVAILABLE_TICKETS,
  LOAD_AVAILABLE_TICKETS_ERROR,
  LOAD_AVAILABLE_TICKETS_SUCCESS,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loadingAvailableTickets: false,
  loadAvailableTicketsSuccess: false,
  loadAvailableTicketsError: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_AVAILABLE_TICKETS:
      return state
        .set('loadingAvailableTickets', true)
        .set('loadAvailableTicketsError', false);
    case LOAD_AVAILABLE_TICKETS_SUCCESS:
      return state
        .set('loadingAvailableTickets', false)
        .set('loadAvailableTicketsSuccess', true)
        .set('availableTickets', action.availableTickets);
    case LOAD_AVAILABLE_TICKETS_ERROR:
      return state
        .set('loadAvailableTicketsError', action.error)
        .set('loadingAvailableTickets', false);
    default:
      return state;
  }
}

export default appReducer;
