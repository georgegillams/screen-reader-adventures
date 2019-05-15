import { createSelector } from 'reselect';

const selectUserDetails = state => state.get('stripePayments');

const makeSelectUserDetails = () =>
  createSelector(
    selectUserDetails,
    userDetailsState => userDetailsState.get('stripePayments'),
  );

const makeSelectUpdateingUserDetails = () =>
  createSelector(
    selectUserDetails,
    userDetailsState => userDetailsState.get('updatingUserDetails'),
  );

const makeSelectUpdateUserDetailsSuccess = () =>
  createSelector(
    selectUserDetails,
    userDetailsState => userDetailsState.get('success'),
  );

const makeSelectUpdateUserDetailsError = () =>
  createSelector(
    selectUserDetails,
    userDetailsState => userDetailsState.get('error'),
  );

const makeSelectLoadingUserDetails = () =>
  createSelector(
    selectUserDetails,
    userDetailsState => userDetailsState.get('loadingUserDetails'),
  );

const makeSelectLoadUserDetailsSuccess = () =>
  createSelector(
    selectUserDetails,
    userDetailsState => userDetailsState.get('loadSuccess'),
  );

const makeSelectLoadUserDetailsError = () =>
  createSelector(
    selectUserDetails,
    userDetailsState => userDetailsState.get('loadError'),
  );

const makeSelectMakingPayment = () =>
  createSelector(
    selectUserDetails,
    userDetailsState => userDetailsState.get('makingPayment'),
  );

const makeSelectPaymentToken = () =>
  createSelector(
    selectUserDetails,
    userDetailsState => userDetailsState.get('paymentToken'),
  );

const makeSelectPaymentSuccess = () =>
  createSelector(
    selectUserDetails,
    userDetailsState => userDetailsState.get('paymentSuccess'),
  );

const makeSelectPaymentError = () =>
  createSelector(
    selectUserDetails,
    userDetailsState => userDetailsState.get('paymentError'),
  );

export {
  selectUserDetails,
  makeSelectMakingPayment,
  makeSelectUserDetails,
  makeSelectUpdateingUserDetails,
  makeSelectUpdateUserDetailsSuccess,
  makeSelectUpdateUserDetailsError,
  makeSelectLoadingUserDetails,
  makeSelectLoadUserDetailsSuccess,
  makeSelectLoadUserDetailsError,
  makeSelectPaymentToken,
  makeSelectPaymentSuccess,
  makeSelectPaymentError,
};
