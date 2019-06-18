import { datumLoad } from '../datum';

import stripePaymentsAllowedAttributes from './stripePaymentsAllowedAttributes';

import authentication from 'utils/authentication';
import { sendPaymentReceiptEmail } from 'utils/emailHelpers';
import reqSecure from 'utils/reqSecure';
import { find } from 'utils/find';
import { UNAUTHORISED_READ } from 'helpers/constants';

export default function resendPaymentReceipt(req) {
  const reqSecured = reqSecure(req, stripePaymentsAllowedAttributes);
  return new Promise((resolve, reject) => {
    authentication(reqSecured).then(
      user => {
        if (user && user.admin) {
          const userIdToResendTo = reqSecured.body.resendId;
          datumLoad({
            redisKey: 'users',
          }).then(userData => {
            datumLoad({
              redisKey: 'stripepayments',
            }).then(paymentData => {
              const { existingValue: paymentToResend } = find(
                paymentData,
                userIdToResendTo,
                'authorId',
              );
              const { existingValue: existingUser } = find(
                userData,
                userIdToResendTo,
              );
              if (existingUser && paymentToResend) {
                sendPaymentReceiptEmail(existingUser, paymentToResend);
              }
            });
          });
        } else {
          reject(UNAUTHORISED_READ);
        }
      },
      err => reject(err),
    );
  });
}
