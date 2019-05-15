import {
  TICKET_COST_EB_ONE_DAY,
  TICKET_COST_R_ONE_DAY,
  TICKET_COST_EB_TWO_DAY,
  TICKET_COST_R_TWO_DAY,
  TICKET_RESERVATION_LENGTH,
} from './constants';

const ticketCostMapping = {
  EB_ONE_DAY: TICKET_COST_EB_ONE_DAY,
  EB_TWO_DAY: TICKET_COST_EB_TWO_DAY,
  R_ONE_DAY: TICKET_COST_R_ONE_DAY,
  R_TWO_DAY: TICKET_COST_R_TWO_DAY,
};

const ticketNamesMapping = {
  EB_ONE_DAY: 'Saturday only early bird ticket',
  EB_TWO_DAY: 'Full weekend early bird ticket',
  R_ONE_DAY: 'Saturday only ticket',
  R_TWO_DAY: 'Full weekend ticket',
};

const getPriceForTicketType = ticketType => {
  return ticketCostMapping[ticketType] || 0;
};

const ticketCanBeReserved = t => {
  return (
    !t.reservedUntil ||
    new Date(t.reservedUntil).getTime() < new Date().getTime()
  );
};

const ticketReservationIsValid = t => {
  return !!t && !ticketCanBeReserved(t);
};

const reserveTicket = (ticket, user, priorReservation) => {
  const ticketClone = JSON.parse(JSON.stringify(ticket));
  ticketClone.reservedTo = user.id;
  ticketClone.reservedUntil =
    new Date().getTime() + 1000 * 60 * 60 * TICKET_RESERVATION_LENGTH;
  // If the current ticket is reserved for longer (eg if we've applied an extension) then the new ticket should have at least the same time remaining:
  if (priorReservation && priorReservation.reservedUntil) {
    ticketClone.reservedUntil = Math.max(
      priorReservation.reservedUntil,
      ticketClone.reservedUntil,
    );
  }
  return ticketClone;
};

const calculateOutstandingBalance = (reservedTicket, payments) => {
  if (!reservedTicket) {
    return 0;
  }

  const ticketCost = getPriceForTicketType(reservedTicket.ticketType);
  if (!payments) {
    return ticketCost;
  }

  let remainingBalance = ticketCost;
  for (let i = 0; i < payments.length; i += 1) {
    remainingBalance -= payments[i].amount;
  }
  remainingBalance = Math.max(0, remainingBalance);
  return remainingBalance;
};

const validateType = ticketType => {
  return !!ticketCostMapping[ticketType];
};

const beautifyTicketType = ticketType => {
  return ticketNamesMapping[ticketType] || ticketType;
};

export {
  reserveTicket,
  ticketReservationIsValid,
  ticketCanBeReserved,
  calculateOutstandingBalance,
  getPriceForTicketType,
  validateType,
  beautifyTicketType,
};
export default {
  reserveTicket,
  ticketReservationIsValid,
  ticketCanBeReserved,
  calculateOutstandingBalance,
  getPriceForTicketType,
  validateType,
  beautifyTicketType,
};
