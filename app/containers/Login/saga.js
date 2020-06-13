import { call, put, select, takeLatest } from 'redux-saga/effects';

import { selectors, actions, constants } from './redux-definitions';

import { setUser } from 'containers/App/actions';
import { pushMessage } from 'containers/RequestStatusWrapper/actions';
import { COMMUNICATION_ERROR_MESSAGE } from 'helpers/messageConstants';
import apiStructure from 'helpers/apiStructure';
import { makeSelectLoginRedirect } from 'containers/App/selectors';
import request from 'utils/request';

const { LOGIN } = constants;
const { loginRegisterSuccess, loginRegisterError } = actions;
const { makeSelectCredentials } = selectors;

const magicLinkSentMessage = { type: 'success', message: 'Magic link sent!' };
const loggedInMessage = { type: 'success', message: 'Login successful!' };

export function* doLogin() {
  const credentials = yield select(makeSelectCredentials());
  const loginRedirect = yield select(makeSelectLoginRedirect());
  const requestURL = apiStructure.requestMagicLink.fullPath;

  try {
    const loginResult = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify({ ...credentials, loginRedirect }),
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
    yield put(loginRegisterError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export default function* saga() {
  yield takeLatest(LOGIN, doLogin);
}
