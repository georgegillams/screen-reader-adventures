import {
  LOAD_BALANCE,
  LOAD_BALANCE_SUCCESS,
  LOAD_BALANCE_ERROR,
  LOAD_USER_TICKET,
  LOAD_USER_TICKET_SUCCESS,
  LOAD_USER_TICKET_ERROR,
} from './constants';

export function loadBalance() {
  return {
    type: LOAD_BALANCE,
  };
}

export function loadBalanceSuccess(balance) {
  return {
    type: LOAD_BALANCE_SUCCESS,
    balance,
  };
}

export function loadBalanceError(error) {
  return {
    type: LOAD_BALANCE_ERROR,
    error,
  };
}

export function loadUserTicket() {
  return {
    type: LOAD_USER_TICKET,
  };
}

export function loadUserTicketSuccess(ticket) {
  return {
    type: LOAD_USER_TICKET_SUCCESS,
    ticket,
  };
}

export function loadUserTicketError(error) {
  return {
    type: LOAD_USER_TICKET_ERROR,
    error,
  };
}
