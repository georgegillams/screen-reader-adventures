import { createSelector } from 'reselect';

const selectLogin = state => state.get('magicLogin');

const makeSelectToken = () =>
  createSelector(
    selectLogin,
    loginState => loginState.get('token'),
  );

const makeSelectLoggingIn = () =>
  createSelector(
    selectLogin,
    loginState => loginState.get('loggingIn'),
  );

const makeSelectLoginSuccessful = () =>
  createSelector(
    selectLogin,
    loginState => loginState.get('success'),
  );

const makeSelectLoginError = () =>
  createSelector(
    selectLogin,
    loginState => loginState.get('error'),
  );

export {
  selectLogin,
  makeSelectToken,
  makeSelectLoggingIn,
  makeSelectLoginSuccessful,
  makeSelectLoginError,
};
