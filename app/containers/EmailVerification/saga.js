import { constants, selectors, actions } from './redux-definitions';

const { VERIFY_EMAIL } = constants;
const { verifyEmailRegisterSuccess, verifyEmailRegisterError } = actions;
const { makeSelectToken } = selectors;

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
      yield put(verifyEmailRegisterError(verificationResult));
      yield put(
        pushMessage({ type: 'error', message: verificationResult.error }),
      );
    } else {
      yield put(verifyEmailRegisterSuccess());
      yield put(pushMessage(emailVerifiedMessage));
    }
  } catch (err) {
    yield put(verifyEmailRegisterError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export default function* verify() {
  yield takeLatest(VERIFY_EMAIL, () => doVerification());
}
