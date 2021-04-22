import { takeLatest, put, call, select } from 'redux-saga/effects';

import request from 'client-utils/common/request';
import apiStructure from 'helpers/common/apiStructure';
import { selectState } from './selectors';

import { setUser } from 'containers/common/Authenticator/actions';
import { signUp } from './actions';

export function* doSignUp() {
  const currentState = yield select(selectState());
  const { credentials } = currentState;

  const requestURL = apiStructure.signUp.fullPath;

  try {
    yield put(signUp.request());

    const result = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (result.error) {
      yield put(signUp.failure(result));
    } else {
      yield put(signUp.success(result));
      yield put(setUser.trigger(result));
    }
  } catch (err) {
    yield put(signUp.failure(err));
  } finally {
    yield put(signUp.fulfill());
  }
}

export default function* saga() {
  yield takeLatest(signUp.TRIGGER, doSignUp);
}
