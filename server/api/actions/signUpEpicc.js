import { datumLoad, datumCreate, datumUpdate } from '../actions/datum';
import { find } from 'utils/find';
import { EMAIL_TAKEN, TICKET_SALE_END } from 'helpers/constants';
import { ticketCanBeReserved, reserveTicket } from 'helpers/ticketing';
import reqSecure from 'utils/reqSecure';
import usersAllowedAttributes from './users/usersAllowedAttributes';
import loginUser from 'utils/login';
import { sendEmailVerificationEmail } from 'utils/emailHelpers';

export default function signUp(req) {
  const reqSecured = reqSecure(req, usersAllowedAttributes);
  return new Promise((resolve, reject) => {
    // Using datum load as we want to avoid invoking authentication when loading users data here
    datumLoad({ redisKey: 'users' }).then(userData => {
      datumLoad({ redisKey: 'tickets' }).then(ticketData => {
        const { existingValue: userProfile } = find(
          userData,
          reqSecured.body.email.toLowerCase(),
          'email',
        );
        if (userProfile) {
          resolve(EMAIL_TAKEN);
        } else {
          let { existingValue: ticket } = find(
            ticketData.filter(ticketCanBeReserved),
            reqSecured.body.ticketType,
            'ticketType',
          );
          if (Date.now() > TICKET_SALE_END) {
            resolve({ error: 'Ticket sales are now closed.' });
          } else if (!ticket) {
            resolve({ error: 'Ticket type is sold out.' });
          } else {
            reqSecured.body.email = reqSecured.body.email.toLowerCase();
            datumCreate(
              { redisKey: 'users' },
              { body: { email: reqSecured.body.email } },
            ).then(createdUser => {
              loginUser(reqSecured, createdUser).then(loginResult => {
                ticket = reserveTicket(ticket, createdUser, null);
                datumUpdate({ redisKey: 'tickets' }, { body: ticket }).then(
                  () => {
                    sendEmailVerificationEmail(loginResult);
                    resolve(loginResult);
                  },
                );
              });
            });
          }
        }
      });
    });
  });
}
