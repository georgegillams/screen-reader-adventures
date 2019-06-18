import { LOGIN } from './constants';
import { loginSuccessful, loginError } from './actions';
import { makeSelectToken } from './selectors';

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { setUser } from 'containers/App/actions';
import { API_ENDPOINT, COMMUNICATION_ERROR_MESSAGE } from 'helpers/constants';
import { pushMessage } from 'containers/RequestStatusWrapper/actions';
import request from 'utils/request';

const loggedInMessage = { type: 'success', message: 'Logged in!' };

export function* doLogin() {
  const token = yield select(makeSelectToken());
  const requestURL = `${API_ENDPOINT}/loginmagiclink`;

  try {
    const loginResult = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify({ magicLinkKey: token }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (loginResult.error) {
      yield put(loginError(loginResult));
      yield put(pushMessage({ type: 'error', message: loginResult.error }));
    } else {
      yield put(loginSuccessful());
      yield put(setUser(loginResult));
      yield put(pushMessage(loggedInMessage));
    }
  } catch (err) {
    yield put(loginError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export default function* login() {
  yield takeLatest(LOGIN, () => doLogin());
}
