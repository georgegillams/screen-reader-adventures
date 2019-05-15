import { createSelector } from 'reselect';

const selectTicketScannerState = state => state.get('unticketscanner');

const makeSelectRegistration = () =>
  createSelector(
    selectTicketScannerState,
    ticketScannerState =>
      ticketScannerState && ticketScannerState.get('registration'),
  );

const makeSelectTicketData = () =>
  createSelector(
    selectTicketScannerState,
    ticketScannerState =>
      ticketScannerState && ticketScannerState.get('ticketData'),
  );

const makeSelectRegistering = () =>
  createSelector(
    selectTicketScannerState,
    ticketScannerState =>
      ticketScannerState && ticketScannerState.get('registering'),
  );

const makeSelectSuccess = () =>
  createSelector(
    selectTicketScannerState,
    ticketScannerState =>
      ticketScannerState && ticketScannerState.get('success'),
  );

const makeSelectError = () =>
  createSelector(
    selectTicketScannerState,
    ticketScannerState => ticketScannerState && ticketScannerState.get('error'),
  );

export {
  selectTicketScannerState,
  makeSelectTicketData,
  makeSelectRegistration,
  makeSelectRegistering,
  makeSelectError,
  makeSelectSuccess,
};
