import { call, put, select, takeLatest } from 'redux-saga/effects';

import { constants, actions, selectors } from './redux-definitions';

import { setUser } from 'containers/App/actions';
import { COMMUNICATION_ERROR_MESSAGE } from 'helpers/messageConstants';
import apiStructure from 'helpers/apiStructure';
import { pushMessage } from 'containers/RequestStatusWrapper/actions';
import request from 'utils/request';

const { SIGN_UP } = constants;
const { signUpRegisterSuccess, signUpRegisterError } = actions;
const { makeSelectCredentials } = selectors;

const signUpSuccessMessage = { type: 'success', message: 'Account created!' };

export function* doSignUp() {
  const credentials = yield select(makeSelectCredentials());
  const requestURL = apiStructure.signUp.fullPath;

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
      yield put(
        pushMessage({ type: 'error', message: signUpResult.errorMessage }),
      );
    } else {
      yield put(signUpRegisterSuccess());
      yield put(setUser(signUpResult));
      yield put(pushMessage(signUpSuccessMessage));
    }
  } catch (err) {
    yield put(signUpRegisterError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export default function* saga() {
  yield takeLatest(SIGN_UP, doSignUp);
}
