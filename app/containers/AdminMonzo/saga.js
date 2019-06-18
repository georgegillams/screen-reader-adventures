import { SET_KEY } from './constants';
import { setKeySuccess, setKeyError } from './actions';
import { makeSelectKeyValue } from './selectors';

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { pushMessage } from 'containers/RequestStatusWrapper/actions';
import { API_ENDPOINT, COMMUNICATION_ERROR_MESSAGE } from 'helpers/constants';
import request from 'utils/request';

const setKeySuccessMessage = {
  type: 'success',
  message: 'Key set!',
};
const setKeyErrorMessage = {
  type: 'error',
  message: 'Could not set key.',
};

export function* doSetKey() {
  const keyValue = yield select(makeSelectKeyValue());
  const magicLinkUrl = `${API_ENDPOINT}/monzo/setKey`;

  try {
    const setKeyResult = yield call(request, magicLinkUrl, {
      method: 'POST',
      body: JSON.stringify({ key: keyValue }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (setKeyResult.error) {
      yield put(pushMessage(setKeyErrorMessage));
      yield put(setKeyError(setKeyResult));
    } else {
      yield put(pushMessage(setKeySuccessMessage));
      yield put(setKeySuccess(setKeyResult));
    }
  } catch (err) {
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export default function* adminUsers() {
  yield takeLatest(SET_KEY, () => doSetKey());
}
