import { createSelector } from 'reselect';

const selectLogin = state => state.get('login');

const makeSelectCredentials = () =>
  createSelector(
    selectLogin,
    loginState => loginState.get('credentials'),
  );

const makeSelectLoggingIn = () =>
  createSelector(
    selectLogin,
    loginState => loginState.get('loggingIn'),
  );

const makeSelectLoginSuccess = () =>
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
  makeSelectCredentials,
  makeSelectLoggingIn,
  makeSelectLoginSuccess,
  makeSelectLoginError,
};
