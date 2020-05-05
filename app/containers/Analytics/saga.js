import { selectors, actions, constants } from './redux-definitions';
import { call, put, select, takeLatest } from 'redux-saga/effects';
const { makeSelectAnalytic } = selectors;
import { API_ENDPOINT } from 'helpers/constants';
import request from 'utils/request';

const { SEND } = constants;
const { sendRegisterSuccess, sendRegisterError } = actions;

export function* doSend() {
  const analytic = yield select(makeSelectAnalytic());
  const requestURL = `${API_ENDPOINT}/analytics/create`;

  try {
    const sendResult = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(analytic),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (sendResult.error) {
      yield put(sendRegisterError(sendResult));
    } else {
      yield put(sendRegisterSuccess());
    }
  } catch (err) {
    yield put(sendRegisterError(err));
  }
}

export default function* saga() {
  yield takeLatest(SEND, doSend);
}
