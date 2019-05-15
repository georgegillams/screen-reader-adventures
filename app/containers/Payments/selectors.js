import { createSelector } from 'reselect';

const selectPayments = state => state.get('payments');

const makeSelectPayment = () =>
  createSelector(
    selectPayments,
    paymentsState => paymentsState.get('payment'),
  );

const makeSelectCreatedPayment = () =>
  createSelector(
    selectPayments,
    paymentsState => paymentsState.get('createdPayment'),
  );

const makeSelectPaymentCreating = () =>
  createSelector(
    selectPayments,
    paymentsState => paymentsState.get('creating'),
  );

const makeSelectPaymentError = () =>
  createSelector(
    selectPayments,
    paymentsState => paymentsState.get('error'),
  );

export {
  selectPayments,
  makeSelectPayment,
  makeSelectCreatedPayment,
  makeSelectPaymentCreating,
  makeSelectPaymentError,
};
