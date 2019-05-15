import { createSelector } from 'reselect';

const selectSignUp = state => state.get('signup');

const makeSelectCredentials = () =>
  createSelector(
    selectSignUp,
    signupState => signupState.get('credentials'),
  );

const makeSelectSigningUp = () =>
  createSelector(
    selectSignUp,
    signupState => signupState.get('signingUp'),
  );

const makeSelectSignUpSuccess = () =>
  createSelector(
    selectSignUp,
    signupState => signupState.get('success'),
  );

const makeSelectSignUpError = () =>
  createSelector(
    selectSignUp,
    signupState => signupState.get('error'),
  );

export {
  selectSignUp,
  makeSelectCredentials,
  makeSelectSigningUp,
  makeSelectSignUpSuccess,
  makeSelectSignUpError,
};
