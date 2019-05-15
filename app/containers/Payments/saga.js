import { call, put, select, takeLatest } from 'redux-saga/effects';
import { CREATE_PAYMENT } from './constants';
import { paymentCreated, createPaymentError } from './actions';
import { API_ENDPOINT } from 'helpers/constants';
import { makeSelectPayment } from './selectors';

import request from 'utils/request';

export function* doPaymentCreation() {
  const payment = yield select(makeSelectPayment());
  const requestURL = `${API_ENDPOINT}/payments/create`;

  try {
    const paymentResult = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payment),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    yield put(paymentCreated(paymentResult));
  } catch (err) {
    yield put(createPaymentError(err));
  }
}

export default function* createPayment() {
  yield takeLatest(CREATE_PAYMENT, () => doPaymentCreation());
}
