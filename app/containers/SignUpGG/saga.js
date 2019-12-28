import { constants, actions, selectors } from './redux-definitions';

const { SIGN_UP } = constants;
const { signUpRegisterSuccess, signUpRegisterError } = actions;
const { makeSelectCredentials } = selectors;

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { setUser } from 'containers/App/actions';
import { API_ENDPOINT, COMMUNICATION_ERROR_MESSAGE } from 'helpers/constants';
import { pushMessage } from 'containers/RequestStatusWrapper/actions';
import request from 'utils/request';

const signUpSuccessMessage = { type: 'success', message: 'Account created!' };

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
      yield put(signUpRegisterError(signUpResult));
      yield put(pushMessage({ type: 'error', message: signUpResult.error }));
    } else {
      yield put(signUpRegisterSuccess());
      yield put(setUser(signUpResult));
      yield put(pushMessage(signUpSuccessMessage));
    }
  } catch (err) {
    yield put(loginRegisterError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export default function* saga() {
  yield takeLatest(SIGN_UP, () => doSignUp());
}
