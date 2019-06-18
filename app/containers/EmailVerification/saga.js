import { VERIFY } from './constants';
import { verifySuccessful, verifyError } from './actions';
import { makeSelectToken } from './selectors';

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { setUser } from 'containers/App/actions';
import { API_ENDPOINT, COMMUNICATION_ERROR_MESSAGE } from 'helpers/constants';
import { pushMessage } from 'containers/RequestStatusWrapper/actions';
import request from 'utils/request';

const emailVerifiedMessage = { type: 'success', message: 'Email verified!' };

export function* doVerification() {
  const token = yield select(makeSelectToken());
  const requestURL = `${API_ENDPOINT}/verifyemail`;

  try {
    const verificationResult = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify({ verificationKey: token }),
      headers: {
        'Content-Type': 'application/json',
      },
    }); // Can add third arg for options
    if (verificationResult.error) {
      yield put(verifyError(verificationResult));
      yield put(
        pushMessage({ type: 'error', message: verificationResult.error }),
      );
    } else {
      yield put(verifySuccessful());
      yield put(pushMessage(emailVerifiedMessage));
    }
  } catch (err) {
    yield put(verifyError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export default function* verify() {
  yield takeLatest(VERIFY, () => doVerification());
}
