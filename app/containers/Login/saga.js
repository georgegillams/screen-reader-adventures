import { LOGIN } from './constants';
import { loginSuccessful, loginError } from './actions';
import { makeSelectCredentials } from './selectors';

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { setUser } from 'containers/App/actions';
import { pushMessage } from 'containers/RequestStatusWrapper/actions';
import { API_ENDPOINT, COMMUNICATION_ERROR_MESSAGE } from 'helpers/constants';
import { makeSelectLoginRedirect } from 'containers/App/selectors';
import request from 'utils/request';

const magicLinkSentMessage = { type: 'success', message: 'Magic link sent!' };
const loggedInMessage = { type: 'success', message: 'Login successful!' };
const logInErrorMessage = {
  type: 'error',
  message: 'Login failed. Please check entered details.',
};

export function* doLogin() {
  const credentials = yield select(makeSelectCredentials());
  const loginRedirect = yield select(makeSelectLoginRedirect());
  const requestURL = `${API_ENDPOINT}${
    credentials.useMagicLink ? '/getmagiclink' : '/login'
  }`;

  try {
    const loginResult = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify({ ...credentials, loginRedirect }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (loginResult.error) {
      yield put(loginError(loginResult));
      yield put(pushMessage(logInErrorMessage));
    } else {
      yield put(loginSuccessful());
      yield put(
        pushMessage(
          credentials.useMagicLink ? magicLinkSentMessage : loggedInMessage,
        ),
      );
      if (!credentials.useMagicLink) {
        yield put(setUser(loginResult));
      }
    }
  } catch (err) {
    yield put(loginError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export default function* login() {
  yield takeLatest(LOGIN, () => doLogin());
}
