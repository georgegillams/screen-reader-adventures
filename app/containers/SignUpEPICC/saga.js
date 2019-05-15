/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { SIGN_UP } from './constants';
import { signUpSuccessful, signUpError } from './actions';
import { setUser } from 'containers/App/actions';
import { pushMessage } from 'containers/RequestStatusWrapper/actions';
import { API_ENDPOINT, COMMUNICATION_ERROR_MESSAGE } from 'helpers/constants';
import {
  makeSelectCredentials,
  makeSelectSelectedTicketType,
} from './selectors';

import request from 'utils/request';

const signUpMessage = { type: 'success', message: 'Sign up successful!' };
const signUpErrorMessage = {
  type: 'error',
  message: 'Error creating account.',
};

export function* doSignUp() {
  const credentials = yield select(makeSelectCredentials());
  const ticketType = yield select(makeSelectSelectedTicketType());
  credentials.ticketType = ticketType;
  // Select username from store
  const requestURL = `${API_ENDPOINT}/signUpEpicc`;

  try {
    // Call our request helper (see 'utils/request')
    const signUpResult = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    }); // Can add third arg for options
    if (signUpResult.error) {
      yield put(signUpError(signUpResult));
      yield put(pushMessage({ type: 'error', message: signUpResult.error }));
    } else {
      yield put(signUpSuccessful());
      yield put(setUser(signUpResult));
      yield put(pushMessage(signUpMessage));
    }
  } catch (err) {
    yield put(signUpError(err));
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
  yield takeLatest(SIGN_UP, () => doSignUp());
}
