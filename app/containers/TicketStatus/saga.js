/**
 * Gets the repositories of the user from Github
 */

import { LOAD_BALANCE, LOAD_USER_TICKET } from './constants';
import {
  loadBalanceSuccess,
  loadBalanceError,
  loadUserTicketSuccess,
  loadUserTicketError,
} from './actions';

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { calculateOutstandingBalance } from 'helpers/ticketing';
import { API_ENDPOINT, COMMUNICATION_ERROR_MESSAGE } from 'helpers/constants';
import { pushMessage } from 'containers/RequestStatusWrapper/actions';
import request from 'utils/request';

export function* doLoadBalance() {
  const paymentsRequestURL = `${API_ENDPOINT}/stripePayments/load`;
  const ticketRequestURL = `${API_ENDPOINT}/tickets/load`;

  try {
    const payments = yield call(request, paymentsRequestURL);
    const ticket = yield call(request, ticketRequestURL);
    if (payments.error) {
      yield put(loadBalanceError(payments));
      yield put(pushMessage({ type: 'error', message: payments.error }));
    } else if (ticket && ticket.error) {
      yield put(loadBalanceError(ticket));
      yield put(pushMessage({ type: 'error', message: ticket.error }));
    } else {
      const remainingBalance = calculateOutstandingBalance(ticket, payments);
      yield put(loadBalanceSuccess(remainingBalance));
    }
  } catch (err) {
    yield put(loadBalanceError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export function* doLoadUserTicket() {
  const requestURL = `${API_ENDPOINT}/tickets/load`;

  try {
    const userTicketResult = yield call(request, requestURL);
    if (userTicketResult && userTicketResult.error) {
      yield put(loadUserTicketError(userTicketResult));
      yield put(
        pushMessage({ type: 'error', message: userTicketResult.error }),
      );
    } else {
      yield put(loadUserTicketSuccess(userTicketResult));
    }
  } catch (err) {
    yield put(loadUserTicketError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export default function* ticketStatus() {
  yield takeLatest(LOAD_BALANCE, () => doLoadBalance());
  yield takeLatest(LOAD_USER_TICKET, () => doLoadUserTicket());
}
