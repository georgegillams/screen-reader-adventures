import {
  PAYMENT_CHANGED,
  CREATE_PAYMENT,
  CREATE_PAYMENT_SUCCESS,
  CREATE_PAYMENT_ERROR,
} from './constants';

export function paymentChanged(newValue) {
  return {
    type: PAYMENT_CHANGED,
    payment: newValue,
  };
}

export function createPayment() {
  return {
    type: CREATE_PAYMENT,
  };
}

export function paymentCreated(payment) {
  return {
    type: CREATE_PAYMENT_SUCCESS,
    createdPayment: payment,
  };
}

export function createPaymentError(error) {
  return {
    type: CREATE_PAYMENT_ERROR,
    error,
  };
}
