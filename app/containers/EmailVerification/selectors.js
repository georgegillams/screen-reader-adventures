import { createSelector } from 'reselect';

const selectVerify = state => state.get('verify');

const makeSelectToken = () =>
  createSelector(
    selectVerify,
    verifyState => verifyState.get('token'),
  );

const makeSelectVerifying = () =>
  createSelector(
    selectVerify,
    verifyState => verifyState.get('verifying'),
  );

const makeSelectVerifyError = () =>
  createSelector(
    selectVerify,
    verifyState => verifyState.get('error'),
  );

const makeSelectVerifySuccessful = () =>
  createSelector(
    selectVerify,
    verifyState => verifyState.get('success'),
  );

export {
  selectVerify,
  makeSelectToken,
  makeSelectVerifying,
  makeSelectVerifySuccessful,
  makeSelectVerifyError,
};
