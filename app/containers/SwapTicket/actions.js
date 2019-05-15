import {
  TICKET_TYPE_CHANGED,
  SWAP_TICKETS,
  SWAP_TICKETS_SUCCESS,
  SWAP_TICKETS_ERROR,
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

export function swapTickets() {
  return {
    type: SWAP_TICKETS,
  };
}

export function swapTicketsSuccess(newTicket) {
  return {
    type: SWAP_TICKETS_SUCCESS,
    newTicket,
  };
}

export function swapTicketsError(error) {
  return {
    type: SWAP_TICKETS_ERROR,
    error,
  };
}
