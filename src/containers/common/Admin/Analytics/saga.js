import { takeLatest, put, call } from 'redux-saga/effects';

import request from 'client-utils/common/request';
import apiStructure from 'helpers/common/apiStructure';

import { load } from './actions';

export function* doLoad() {
  const requestURL = apiStructure.loadAnalyticsSummary.fullPath;

  try {
    yield put(load.request());

    const result = yield call(request, requestURL);

    if (result.error) {
      yield put(load.failure(result));
    } else {
      yield put(load.success(result.analytics));
    }
  } catch (err) {
    yield put(load.failure(err));
  } finally {
    yield put(load.fulfill());
  }
}

export default function* saga() {
  yield takeLatest(load.TRIGGER, doLoad);
}
