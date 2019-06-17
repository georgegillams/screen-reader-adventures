import { datumLoad, datumLoadSingle, datumCreate } from '../datum';

import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';
import { UNAUTHORISED_READ } from 'helpers/constants';
import { ticketReservationIsValid } from 'helpers/ticketing';
import { find } from 'utils/find';

export default function load(req) {
  return new Promise((resolve, reject) => {
    authentication(req).then(
      user => {
        if (user) {
          datumLoad({
            redisKey: 'tickets',
          }).then(ticketData => {
            const { existingValue: ticket } = find(
              ticketData,
              user.id,
              'reservedTo',
            );
            if (!ticketReservationIsValid(ticket)) {
              resolve(null);
            } else {
              resolve(ticket);
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
