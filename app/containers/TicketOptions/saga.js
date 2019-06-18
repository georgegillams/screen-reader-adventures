/**
 * Gets the repositories of the user from Github
 */

import { LOAD_AVAILABLE_TICKETS } from './constants';
import {
  loadAvailableTicketsError,
  loadAvailableTicketsSuccess,
} from './actions';

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { pushMessage } from 'containers/RequestStatusWrapper/actions';
import { API_ENDPOINT, COMMUNICATION_ERROR_MESSAGE } from 'helpers/constants';
import request from 'utils/request';

/**
 * Github repos request/response handler
 */
export function* doLoadAvailableTickets() {
  const requestURL = `${API_ENDPOINT}/tickets/loadRemaining`;

  try {
    const loadAResult = yield call(request, requestURL);
    if (loadAResult.error) {
      yield put(loadAvailableTicketsError(loadAResult));
      yield put(pushMessage({ type: 'error', message: loadAResult.error }));
    } else {
      yield put(loadAvailableTicketsSuccess(loadAResult));
      yield put(
        pushMessage({ type: 'success', message: 'Available tickets loaded' }),
      );
    }
  } catch (err) {
    yield put(loadAvailableTicketsError(err));
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
  yield takeLatest(LOAD_AVAILABLE_TICKETS, () => doLoadAvailableTickets());
}
