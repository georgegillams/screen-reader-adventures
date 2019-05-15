import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_MONZO } from './constants';
import { monzoLoadSuccess, monzoLoadError } from './actions';
import { API_ENDPOINT, COMMUNICATION_ERROR_MESSAGE } from 'helpers/constants';
import { pushMessage } from 'containers/RequestStatusWrapper/actions';
import { makeSelectPassword } from './selectors';
import request from 'utils/request';

const monzoLoadSuccessMessage = {
  type: 'success',
  message: 'Monzo pot data loaded.',
};

export function* doLoadMonzo() {
  const password = yield select(makeSelectPassword());
  const requestURL = `${API_ENDPOINT}/monzo/loadPots`;

  try {
    const monzoResult = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify({ password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (monzoResult.error) {
      yield put(monzoLoadError(monzoResult));
      yield put(pushMessage({ type: 'error', message: monzoResult.error }));
    } else if (monzoResult.warning) {
      yield put(pushMessage({ type: 'warn', message: monzoResult.warning }));
    } else {
      yield put(monzoLoadSuccess(monzoResult));
      yield put(pushMessage(monzoLoadSuccessMessage));
    }
  } catch (err) {
    yield put(monzoLoadError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export default function* saga() {
  yield takeLatest(LOAD_MONZO, doLoadMonzo);
}
