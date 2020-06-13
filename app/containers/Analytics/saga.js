import { call, put, select, takeLatest } from 'redux-saga/effects';

import { selectors, actions, constants } from './redux-definitions';

import apiStructure from 'helpers/apiStructure';
import request from 'utils/request';

const { makeSelectAnalytic } = selectors;

const { SEND } = constants;
const { sendRegisterSuccess, sendRegisterError } = actions;

export function* doSend() {
  const analytic = yield select(makeSelectAnalytic());
  const requestURL = apiStructure.createAnalytic.fullPath;

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
