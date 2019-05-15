import {
  PAYMENT_TOKEN_CHANGED,
  MAKE_PAYMENT,
  MAKE_PAYMENT_SUCCESS,
  MAKE_PAYMENT_ERROR,
} from './constants';

export function paymentTokenChanged(newValue) {
  return {
    type: PAYMENT_TOKEN_CHANGED,
    paymentToken: newValue,
  };
}

export function makePayment() {
  return {
    type: MAKE_PAYMENT,
  };
}

export function makePaymentSuccess() {
  return {
    type: MAKE_PAYMENT_SUCCESS,
  };
}

export function makePaymentError(paymentError) {
  return {
    type: MAKE_PAYMENT_ERROR,
    paymentError,
  };
}
