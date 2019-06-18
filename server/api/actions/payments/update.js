import { datumUpdate } from '../datum';

import paymentsAllowedAttributes from './paymentsAllowedAttributes';

import authentication from 'utils/authentication';
import { UNAUTHORISED_WRITE } from 'helpers/constants';
import reqSecure from 'utils/reqSecure';

export default function update(req) {
  const reqSecured = reqSecure(req, paymentsAllowedAttributes);
  return new Promise((resolve, reject) => {
    authentication(reqSecured).then(
      user => {
        if (user && user.admin) {
          resolve(datumUpdate({ redisKey: 'payments' }, reqSecured));
        } else {
          reject(UNAUTHORISED_WRITE);
        }
      },
      err => reject(err),
    );
  });
}
