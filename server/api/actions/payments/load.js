import { datumLoad } from '../datum';
import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';
import { UNAUTHORISED_READ } from 'helpers/constants';
import { associate } from 'helpers/objects';
import paymentsAllowedAttributes from './private/paymentsAllowedAttributes';

export default function loadAll(req) {
  const reqSecured = reqSecure(req, paymentsAllowedAttributes);
  return new Promise((resolve, reject) => {
    authentication(reqSecured).then(
      user => {
        if (user && user.admin) {
          datumLoad({
            redisKey: 'payments',
            includeDeleted: true,
          }).then(paymentData => {
            datumLoad({
              redisKey: 'stripepayments',
              includeDeleted: true,
            }).then(charges => {
              const result = associate(
                paymentData,
                charges,
                'id',
                'paymentId',
                'charge',
                false,
              );
              resolve(result);
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
