import {
  CREDENTIALS_CHANGED,
  TICKET_SELECTION_CONFIRMED,
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  TICKET_TYPE_CHANGED,
} from './constants';

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */
export function setSelectedTicketType(newValue) {
  return {
    type: TICKET_TYPE_CHANGED,
    ticketType: newValue,
  };
}

export function setTicketSelectionConfirmed(newValue) {
  return {
    type: TICKET_SELECTION_CONFIRMED,
    ticketSelectionConfirmed: newValue,
  };
}

export function credentialsChanged(newValue) {
  return {
    type: CREDENTIALS_CHANGED,
    credentials: newValue,
  };
}
export function signUp() {
  return {
    type: SIGN_UP,
  };
}

export function signUpSuccessful() {
  return {
    type: SIGN_UP_SUCCESS,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function signUpError(error) {
  return {
    type: SIGN_UP_ERROR,
    error,
  };
}
