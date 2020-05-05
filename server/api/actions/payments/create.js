import { datumCreate } from '../datum';

import lockPromise from 'utils/lock';
import authentication from 'utils/authentication';
import { UNAUTHORISED_WRITE } from 'helpers/constants';
import reqSecure from 'utils/reqSecure';
import paymentsAllowedAttributes from './private/paymentsAllowedAttributes';

export default function create(req) {
  const reqSecured = reqSecure(req, paymentsAllowedAttributes);
  return lockPromise(
    'payments',
    () =>
      new Promise((resolve, reject) => {
        authentication(reqSecured).then(
          user => {
            if (reqSecured.body.amount < 30) {
              reject({
                error: 'invalid-input',
                errorMessage: 'Payments under 30p are not possible.',
              });
              return;
            }
            if (reqSecured.body.amount > 1000000) {
              reject({
                error: 'invalid-input',
                errorMessage: 'Payments over £10,000 are not possible.',
              });
              return;
            }
            resolve(datumCreate({ redisKey: 'payments', user }, reqSecured));
          },
          err => reject(err),
        );
      }),
  );
}
