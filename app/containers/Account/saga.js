import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOGOUT, REQUEST_VERIFICATION_EMAIL } from './constants';
import {
  logoutSuccess,
  logoutError,
  requestVerificationEmailError,
  requestVerificationEmailSuccess,
} from './actions';
import { setUser } from 'containers/App/actions';
import { pushMessage } from 'containers/RequestStatusWrapper/actions';
import { API_ENDPOINT, COMMUNICATION_ERROR_MESSAGE } from 'helpers/constants';
import { makeSelectCredentials } from './selectors';

import request from 'utils/request';

const logoutMessage = { type: 'success', message: 'Logged out!' };
const logoutErrorMessage = { type: 'error', message: 'Error logging out!' };
const verificationEmailMessage = {
  type: 'success',
  message: 'Verification email sent!',
};
const verificationEmailErrorMessage = {
  type: 'error',
  message: 'Error sending verification email!',
};

export function* doRequestVerificationEmail() {
  const requestURL = `${API_ENDPOINT}/requestVerificationEmail`;

  try {
    const requestEmailVerificationResult = yield call(request, requestURL, {
      method: 'POST',
      body: '',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (requestEmailVerificationResult.error) {
      yield put(requestVerificationEmailError(requestEmailVerificationResult));
      yield put(pushMessage(verificationEmailErrorMessage));
    } else {
      yield put(requestVerificationEmailSuccess());
      yield put(pushMessage(verificationEmailMessage));
    }
  } catch (err) {
    yield put(requestVerificationEmailError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export function* doLogout() {
  const requestURL = `${API_ENDPOINT}/logout`;

  try {
    const logoutResult = yield call(request, requestURL, {
      method: 'POST',
      body: '',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (logoutResult.error) {
      yield put(logoutError(logoutResult));
      yield put(pushMessage(logoutErrorMessage));
    } else {
      yield put(logoutSuccess());
      yield put(setUser(null));
      yield put(pushMessage(logoutMessage));
    }
  } catch (err) {
    yield put(logoutError(err));
    yield put(pushMessage(logoutErrorMessage));
  }
}

export default function* logout() {
  yield takeLatest(LOGOUT, () => doLogout());
  yield takeLatest(REQUEST_VERIFICATION_EMAIL, () =>
    doRequestVerificationEmail(),
  );
}
