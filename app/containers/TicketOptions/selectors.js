import { createSelector } from 'reselect';

const selectTicketOptions = state => state.get('ticketOptions');

const makeSelectAvailableTickets = () =>
  createSelector(
    selectTicketOptions,
    ticketOptionsState => ticketOptionsState.get('availableTickets'),
  );

const makeSelectLoadingAvailableTickets = () =>
  createSelector(
    selectTicketOptions,
    ticketOptionsState => ticketOptionsState.get('loadingAvailableTickets'),
  );

const makeSelectLoadAvailableTicketsSuccess = () =>
  createSelector(
    selectTicketOptions,
    ticketOptionsState => ticketOptionsState.get('loadAvailableTicketsSuccess'),
  );

const makeSelectLoadAvailableTicketsError = () =>
  createSelector(
    selectTicketOptions,
    ticketOptionsState => ticketOptionsState.get('loadAvailableTicketsError'),
  );

export {
  selectTicketOptions,
  makeSelectAvailableTickets,
  makeSelectLoadingAvailableTickets,
  makeSelectLoadAvailableTicketsSuccess,
  makeSelectLoadAvailableTicketsError,
};
