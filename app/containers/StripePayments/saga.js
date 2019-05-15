import { call, put, select, takeLatest } from 'redux-saga/effects';
import { MAKE_PAYMENT } from './constants';
import { makePaymentError, makePaymentSuccess } from './actions';
import { API_ENDPOINT, COMMUNICATION_ERROR_MESSAGE } from 'helpers/constants';
import { loadBalance, loadUserTicket } from 'containers/TicketStatus/actions';
import { makeSelectBalance } from 'containers/TicketStatus/selectors';
import { makeSelectPaymentToken } from './selectors';
import { pushMessage } from 'containers/RequestStatusWrapper/actions';

import request from 'utils/request';

const paymentSuccessMessage = {
  type: 'success',
  message: 'Payment recieved',
};

export function* doMakePayment() {
  const paymentAmount = yield select(makeSelectBalance());
  const paymentToken = yield select(makeSelectPaymentToken());
  const requestURL = `${API_ENDPOINT}/stripePayments/pay`;

  try {
    const paymentResult = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify({ paymentToken, paymentAmount }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (paymentResult.error) {
      yield put(makePaymentError(paymentResult));
      yield put(pushMessage({ type: 'error', message: paymentResult.error }));
    } else {
      yield put(makePaymentSuccess());
      yield put(loadBalance());
      yield put(loadUserTicket());
      yield put(pushMessage(paymentSuccessMessage));
    }
  } catch (err) {
    yield put(makePaymentError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export default function* updateUserDetails() {
  yield takeLatest(MAKE_PAYMENT, () => doMakePayment());
}
