/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  MAKE_PAYMENT,
  MAKE_PAYMENT_ERROR,
  MAKE_PAYMENT_SUCCESS,
  PAYMENT_TOKEN_CHANGED,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  makingPayment: false,
  paymentToken: '',
  paymentSuccess: false,
  paymentError: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case PAYMENT_TOKEN_CHANGED:
      return state.set('paymentToken', action.paymentToken);
    case MAKE_PAYMENT:
      return state.set('makingPayment', true).set('paymentError', false);
    case MAKE_PAYMENT_SUCCESS:
      return state.set('makingPayment', false).set('paymentSuccess', true);
    case MAKE_PAYMENT_ERROR:
      return state
        .set('paymentError', action.paymentError)
        .set('makingPayment', false);
    default:
      return state;
  }
}

export default appReducer;
