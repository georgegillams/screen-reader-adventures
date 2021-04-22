import { takeLatest, put, call, select } from 'redux-saga/effects';

import request from 'client-utils/common/request';
import apiStructure from 'helpers/common/apiStructure';

import { selectState } from './selectors';
import { login } from './actions';
import { setUser } from 'containers/common/Authenticator/actions';

export function* doLogin() {
  const currentState = yield select(selectState());
  const { token } = currentState;
  const requestURL = apiStructure.loginWithMagicLink.fullPath;

  try {
    yield put(login.request());

    const result = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify({ magicLinkKey: token }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (result.error) {
      yield put(login.failure(result));
    } else {
      yield put(login.success(result));
      yield put(setUser.trigger(result));
    }
  } catch (err) {
    yield put(login.failure(err));
  } finally {
    yield put(login.fulfill());
  }
}
export default function* saga() {
  yield takeLatest(login.TRIGGER, doLogin);
}
