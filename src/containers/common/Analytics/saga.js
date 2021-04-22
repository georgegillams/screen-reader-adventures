import { takeLatest, put, call, select } from 'redux-saga/effects';

import request from 'client-utils/common/request';
import apiStructure from 'helpers/common/apiStructure';

import { selectState } from './selectors';
import { sendAnalytic } from './actions';

export function* doSendAnalytic() {
  const currentState = yield select(selectState());
  const { analytic } = currentState;
  const requestURL = apiStructure.createAnalytic.fullPath;

  try {
    yield put(sendAnalytic.request());

    const result = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(analytic),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (result.error) {
      yield put(sendAnalytic.failure(result));
    } else {
      yield put(sendAnalytic.success(result));
    }
  } catch (err) {
    yield put(sendAnalytic.failure(err));
  } finally {
    yield put(sendAnalytic.fulfill());
  }
}

export default function* saga() {
  yield takeLatest(sendAnalytic.TRIGGER, doSendAnalytic);
}
