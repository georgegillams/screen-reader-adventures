import { datumLoad } from '../datum';

import stripePaymentsAllowedAttributes from './stripePaymentsAllowedAttributes';

import authentication from 'utils/authentication';
import { sendMagicLinkTicketEmail } from 'utils/emailHelpers';
import reqSecure from 'utils/reqSecure';
import { find } from 'utils/find';
import { UNAUTHORISED_READ } from 'helpers/constants';

export default function resendTicketEmail(req) {
  const reqSecured = req;
  return new Promise((resolve, reject) => {
    authentication(reqSecured).then(
      user => {
        if (user && user.admin) {
          const userIdToResendTo = reqSecured.body.resendId;
          datumLoad({
            redisKey: 'users',
          }).then(userData => {
            const { existingValue: existingUser } = find(
              userData,
              userIdToResendTo,
            );
            // TODO getCompletionInformation for the user, and pass their ticket to the email helper
            const ticketData = {
              email: 'test@example.com',
              ticketId: 'asdfg12345',
            };
            if (existingUser) {
              sendMagicLinkTicketEmail(
                existingUser,
                ticketData,
                reqSecured.body.divertToAdmin,
              );
            }
          });
        } else {
          reject(UNAUTHORISED_READ);
        }
      },
      err => reject(err),
    );
  });
}
