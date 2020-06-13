import { call, put, select, takeLatest } from 'redux-saga/effects';

import { constants, actions, selectors } from './redux-definitions';

import { setUser } from 'containers/App/actions';
import { COMMUNICATION_ERROR_MESSAGE } from 'helpers/messageConstants';
import apiStructure from 'helpers/apiStructure';
import { pushMessage } from 'containers/RequestStatusWrapper/actions';
import request from 'utils/request';

const { LOGIN } = constants;
const { loginRegisterSuccess, loginRegisterError } = actions;
const { makeSelectToken } = selectors;

const loggedInMessage = { type: 'success', message: 'Logged in!' };

export function* doLogin() {
  const token = yield select(makeSelectToken());
  const requestURL = apiStructure.loginWithMagicLink.fullPath;

  try {
    const loginResult = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify({ magicLinkKey: token }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (loginResult.error) {
      yield put(loginRegisterError(loginResult));
      yield put(
        pushMessage({ type: 'error', message: loginResult.errorMessage }),
      );
    } else {
      yield put(loginRegisterSuccess());
      yield put(setUser(loginResult));
      yield put(pushMessage(loggedInMessage));
    }
  } catch (err) {
    yield put(loginRegisterError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export default function* saga() {
  yield takeLatest(LOGIN, doLogin);
}
