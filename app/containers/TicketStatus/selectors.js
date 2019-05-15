import { createSelector } from 'reselect';

const selectTicketStatus = state => state.get('ticketStatus');

const makeSelectLoadingBalance = () =>
  createSelector(
    selectTicketStatus,
    ticketStatusState =>
      ticketStatusState && ticketStatusState.get('loadingBalance'),
  );

const makeSelectBalance = () =>
  createSelector(
    selectTicketStatus,
    ticketStatusState => ticketStatusState && ticketStatusState.get('balance'),
  );

const makeSelectLoadBalanceSuccess = () =>
  createSelector(
    selectTicketStatus,
    ticketStatusState =>
      ticketStatusState && ticketStatusState.get('loadBalanceSuccess'),
  );

const makeSelectLoadBalanceError = () =>
  createSelector(
    selectTicketStatus,
    ticketStatusState =>
      ticketStatusState && ticketStatusState.get('loadBalanceError'),
  );

const makeSelectLoadingUserTicket = () =>
  createSelector(
    selectTicketStatus,
    ticketStatusState =>
      ticketStatusState && ticketStatusState.get('loadingUserTicket'),
  );

const makeSelectUserTicket = () =>
  createSelector(
    selectTicketStatus,
    ticketStatusState =>
      ticketStatusState && ticketStatusState.get('userTicket'),
  );

const makeSelectLoadUserTicketSuccess = () =>
  createSelector(
    selectTicketStatus,
    ticketStatusState =>
      ticketStatusState && ticketStatusState.get('loadUserTicketSuccess'),
  );

const makeSelectLoadUserTicketError = () =>
  createSelector(
    selectTicketStatus,
    ticketStatusState =>
      ticketStatusState && ticketStatusState.get('loadUserTicketError'),
  );

export {
  makeSelectLoadingBalance,
  makeSelectBalance,
  makeSelectLoadBalanceSuccess,
  makeSelectLoadBalanceError,
  makeSelectLoadingUserTicket,
  makeSelectUserTicket,
  makeSelectLoadUserTicketSuccess,
  makeSelectLoadUserTicketError,
};
