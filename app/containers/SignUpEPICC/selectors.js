import { createSelector } from 'reselect';

const selectSignUp = state => state.get('signup');

const makeSelectCredentials = () =>
  createSelector(
    selectSignUp,
    signupState => signupState.get('credentials'),
  );

const makeSelectTicketSelectionConfirmed = () =>
  createSelector(
    selectSignUp,
    signupState => signupState.get('ticketSelectionConfirmed'),
  );

const makeSelectSelectedTicketType = () =>
  createSelector(
    selectSignUp,
    signupState => signupState.get('ticketType'),
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

const makeSelectLoadAvailableTicketsError = () =>
  createSelector(
    selectSignUp,
    signupState => signupState.get('loadAvailableTicketsError'),
  );

export {
  selectSignUp,
  makeSelectCredentials,
  makeSelectTicketSelectionConfirmed,
  makeSelectLoadAvailableTicketsError,
  makeSelectSigningUp,
  makeSelectSignUpSuccess,
  makeSelectSignUpError,
  makeSelectSelectedTicketType,
};
