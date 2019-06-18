import { datumLoad, datumLoadSingle, datumCreate } from '../datum';

import stripePaymentsAllowedAttributes from './stripePaymentsAllowedAttributes';

import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';
import { UNAUTHORISED_READ } from 'helpers/constants';
import { find } from 'utils/find';

export default function load(req) {
  const reqSecured = reqSecure(req, stripePaymentsAllowedAttributes);
  return new Promise((resolve, reject) => {
    authentication(reqSecured).then(
      user => {
        if (user) {
          datumLoad({ redisKey: 'stripepayments' }).then(stripePaymentsData => {
            if (!stripePaymentsData) {
              resolve([]);
            }
            const result = stripePaymentsData.filter(p => p.userId === user.id);
            resolve(result);
          });
        } else {
          resolve(UNAUTHORISED_READ);
        }
      },
      err => reject(err),
    );
  });
}
