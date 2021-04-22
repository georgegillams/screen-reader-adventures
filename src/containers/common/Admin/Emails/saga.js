import { takeLatest, put, call, select } from 'redux-saga/effects';

import request from 'client-utils/common/request';
import apiStructure from 'helpers/common/apiStructure';

import { load, resend } from './actions';
import { selectState } from './selectors';

export function* doLoad() {
  const requestURL = apiStructure.loadEmails.fullPath;

  try {
    yield put(load.request());

    const result = yield call(request, requestURL);

    if (result.error) {
      yield put(load.failure(result));
    } else {
      yield put(load.success(result.emails));
    }
  } catch (err) {
    yield put(load.failure(err));
  } finally {
    yield put(load.fulfill());
  }
}

export function* doResend() {
  const currentState = yield select(selectState());
  const { emailToResend } = currentState;
  const requestURL = apiStructure.resendEmail.fullPath;

  try {
    yield put(resend.request());

    const result = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(emailToResend),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (result.error) {
      yield put(resend.failure(result));
    } else {
      yield put(resend.success(result.emails));
      yield put(load.trigger());
    }
  } catch (err) {
    yield put(resend.failure(err));
  } finally {
    yield put(resend.fulfill());
  }
}

export default function* saga() {
  yield takeLatest(load.TRIGGER, doLoad);
  yield takeLatest(resend.TRIGGER, doResend);
}
