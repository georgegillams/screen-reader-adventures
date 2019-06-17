import { SIGN_UP } from './constants';
import { signUpSuccessful, signUpError } from './actions';
import { makeSelectCredentials } from './selectors';

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { setUser } from 'containers/App/actions';
import { pushMessage } from 'containers/RequestStatusWrapper/actions';
import { API_ENDPOINT, COMMUNICATION_ERROR_MESSAGE } from 'helpers/constants';
import request from 'utils/request';

const signUpMessage = { type: 'success', message: 'Sign up successful!' };
const signUpErrorMessage = {
  type: 'error',
  message: 'Error creating account.',
};

export function* doSignUp() {
  const credentials = yield select(makeSelectCredentials());
  const requestURL = `${API_ENDPOINT}/signUp`;

  try {
    const signUpResult = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    });
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

export default function* signUp() {
  yield takeLatest(SIGN_UP, () => doSignUp());
}
