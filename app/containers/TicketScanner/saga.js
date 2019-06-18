/**
 * Gets the repositories of the user from Github
 */

import { REGISTER_USER } from './constants';
import { registerUserSuccess, registerUserError } from './actions';
import { makeSelectTicketData } from './selectors';

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { API_ENDPOINT, COMMUNICATION_ERROR_MESSAGE } from 'helpers/constants';
import { pushMessage } from 'containers/RequestStatusWrapper/actions';
import request from 'utils/request';

export function* doRegisterUser() {
  const ticketData = yield select(makeSelectTicketData());
  console.log(`sendingTicketData`, ticketData);
  const registrationStatusUrl = `${API_ENDPOINT}/registrationStatus/register`;

  try {
    const registrationResult = yield call(request, registrationStatusUrl, {
      method: 'POST',
      body: JSON.stringify(ticketData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (registrationResult.error) {
      yield put(registerUserError(registrationResult));
      yield put(
        pushMessage({ type: 'error', message: registrationResult.error }),
      );
    } else {
      yield put(registerUserSuccess(registrationResult));
    }
  } catch (err) {
    yield put(registerUserError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export default function* ticketScanerSaga() {
  yield takeLatest(REGISTER_USER, () => doRegisterUser());
}
