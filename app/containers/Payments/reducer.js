import { fromJS } from 'immutable';

import {
  PAYMENT_CHANGED,
  CREATE_PAYMENT,
  CREATE_PAYMENT_ERROR,
  CREATE_PAYMENT_SUCCESS,
} from './constants';

const initialState = fromJS({
  payment: {},
  creating: false,
  error: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case PAYMENT_CHANGED:
      return state.set('payment', action.payment);
    case CREATE_PAYMENT:
      return state.set('creating', true).set('error', false);
    case CREATE_PAYMENT_SUCCESS:
      return state
        .set('creating', false)
        .set('createdPayment', action.createdPayment);
    case CREATE_PAYMENT_ERROR:
      return state.set('error', action.error).set('creating', false);
    default:
      return state;
  }
}

export default appReducer;
