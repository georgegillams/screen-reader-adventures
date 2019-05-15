import { createSelector } from 'reselect';

const selectSwapTickets = state => state.get('ticketSwap');

const makeSelectSelectedTicketType = () =>
  createSelector(
    selectSwapTickets,
    swapTicketsState => swapTicketsState.get('ticketType'),
  );

const makeSelectSwappingTickets = () =>
  createSelector(
    selectSwapTickets,
    swapTicketsState => swapTicketsState.get('swappingTickets'),
  );

const makeSelectSwapTicketsSuccess = () =>
  createSelector(
    selectSwapTickets,
    swapTicketsState => swapTicketsState.get('swapTicketSuccess'),
  );

const makeSelectSwapTicketError = () =>
  createSelector(
    selectSwapTickets,
    swapTicketsState => swapTicketsState.get('swapTicketError'),
  );

const makeSelectAvailableTickets = () =>
  createSelector(
    selectSwapTickets,
    swapTicketsState => swapTicketsState.get('availableTickets'),
  );

const makeSelectLoadingAvailableTickets = () =>
  createSelector(
    selectSwapTickets,
    swapTicketsState => swapTicketsState.get('loadingAvailableTickets'),
  );

const makeSelectLoadAvailableTicketsSuccess = () =>
  createSelector(
    selectSwapTickets,
    swapTicketsState => swapTicketsState.get('loadAvailableTicketsSuccess'),
  );

const makeSelectLoadAvailableTicketsError = () =>
  createSelector(
    selectSwapTickets,
    swapTicketsState => swapTicketsState.get('loadAvailableTicketsError'),
  );

export {
  selectSwapTickets,
  makeSelectSwappingTickets,
  makeSelectSwapTicketsSuccess,
  makeSelectSwapTicketError,
  makeSelectSelectedTicketType,
  makeSelectAvailableTickets,
  makeSelectLoadingAvailableTickets,
  makeSelectLoadAvailableTicketsSuccess,
  makeSelectLoadAvailableTicketsError,
};
