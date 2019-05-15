/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { SWAP_TICKETS } from './constants';
import { swapTicketsSuccess, swapTicketsError } from './actions';
import { pushMessage } from 'containers/RequestStatusWrapper/actions';
import { loadBalance, loadUserTicket } from 'containers/TicketStatus/actions';
import { API_ENDPOINT, COMMUNICATION_ERROR_MESSAGE } from 'helpers/constants';
import { makeSelectSelectedTicketType } from './selectors';

import request from 'utils/request';

/**
 * Github repos request/response handler
 */
export function* doSwapTickets() {
  const newTicketType = yield select(makeSelectSelectedTicketType());
  const requestURL = `${API_ENDPOINT}/tickets/swap`;

  try {
    // Call our request helper (see 'utils/request')
    const loadAResult = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify({ ticketType: newTicketType }),
      headers: {
        'Content-Type': 'application/json',
      },
    }); // Can add third arg for options
    if (loadAResult.error) {
      yield put(swapTicketsError(loadAResult));
      yield put(pushMessage({ type: 'error', message: loadAResult.error }));
    } else {
      yield put(swapTicketsSuccess(loadAResult));
      yield put(loadBalance());
      yield put(loadUserTicket());
      yield put(
        pushMessage({ type: 'success', message: 'Ticket swap successful!' }),
      );
    }
  } catch (err) {
    yield put(swapTicketsError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}
/**
 * Root saga manages watcher lifecycle
 */
export default function* signUp() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(SWAP_TICKETS, () => doSwapTickets());
}
