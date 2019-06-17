import { datumLoad, datumUpdate } from '../datum';

import ticketsAllowedAttributes from './ticketsAllowedAttributes';

import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';
import { ticketCanBeReserved, reserveTicket } from 'helpers/ticketing';
import { UNAUTHORISED_READ } from 'helpers/constants';
import { find } from 'utils/find';

export default function swap(req) {
  return new Promise((resolve, reject) => {
    authentication(req).then(
      user => {
        const reqSecured = reqSecure(req, ticketsAllowedAttributes);
        const { ticketType: requestedTicketType } = reqSecured.body;
        console.log(`swap requested to ticket type`, requestedTicketType);
        if (user) {
          console.log(`user`, user);
          datumLoad({
            redisKey: 'tickets',
          }).then(ticketData => {
            // console.log(`ticketData`, ticketData);
            const { existingValue: currentTicket } = find(
              ticketData,
              user.id,
              'reservedTo',
            );
            if (currentTicket) {
              console.log(`user currently has ticket`, currentTicket.id);
              console.log(`with type`, currentTicket.ticketType);
            }
            let { existingValue: newTicket } = find(
              ticketData.filter(ticketCanBeReserved),
              requestedTicketType,
              'ticketType',
            );
            if (newTicket) {
              console.log(`swap candidate found`, newTicket);
              newTicket = reserveTicket(newTicket, user, currentTicket);
              console.log(`newTicket.reservedUntil`, newTicket.reservedUntil);
              datumUpdate({ redisKey: 'tickets' }, { body: newTicket }).then(
                updatedNewTicket => {
                  console.log(`newTicketUpdated`, updatedNewTicket);
                  if (currentTicket) {
                    currentTicket.reservedUntil = null;
                    currentTicket.reservedTo = null;
                    datumUpdate(
                      { redisKey: 'tickets' },
                      { body: currentTicket },
                    ).then(updatedCurrentTicket => {
                      console.log(`oldTicketUpdated`, updatedCurrentTicket);
                      resolve(updatedNewTicket);
                    });
                  } else {
                    resolve(updatedNewTicket);
                  }
                },
              );
            } else {
              console.log(`NO TICKETS OF KIND`, requestedTicketType);
              resolve({ error: 'Cannot reserve ticket. None remaining.' });
            }
          });
        } else {
          resolve(UNAUTHORISED_READ);
        }
      },
      err => reject(err),
    );
  });
}
