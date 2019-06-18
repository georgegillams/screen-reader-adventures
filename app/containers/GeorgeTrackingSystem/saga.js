import { LOAD_GTS_LATEST } from './constants';
import { loadGtsLatestSuccess, loadGtsLatestError } from './actions';

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { API_ENDPOINT } from 'helpers/constants';
import request from 'utils/request';

export function* getGtsLatest() {
  const requestURL = `${API_ENDPOINT}/gts/loadLatest`;

  try {
    const gtsLatest = yield call(request, requestURL);
    yield put(loadGtsLatestSuccess(gtsLatest));
  } catch (err) {
    yield put(loadGtsLatestError(err));
  }
}

export default function* gtsgtsLatest() {
  yield takeLatest(LOAD_GTS_LATEST, getGtsLatest);
}
