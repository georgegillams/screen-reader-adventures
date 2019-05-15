import {
  LOAD_AVAILABLE_TICKETS,
  LOAD_AVAILABLE_TICKETS_SUCCESS,
  LOAD_AVAILABLE_TICKETS_ERROR,
} from './constants';

export function loadAvailableTickets() {
  return {
    type: LOAD_AVAILABLE_TICKETS,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {object} gtsLatest The repository data
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function loadAvailableTicketsSuccess(result) {
  return {
    type: LOAD_AVAILABLE_TICKETS_SUCCESS,
    availableTickets: result,
  };
}
export function loadAvailableTicketsError(error) {
  return {
    type: LOAD_AVAILABLE_TICKETS_ERROR,
    error,
  };
}
