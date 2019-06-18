import { datumCreate } from '../datum';

import paymentsAllowedAttributes from './paymentsAllowedAttributes';

import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';

export default function create(req) {
  const reqSecured = reqSecure(req, paymentsAllowedAttributes);
  return new Promise((resolve, reject) => {
    authentication(reqSecured).then(
      user => {
        resolve(datumCreate({ redisKey: 'payments', user }, reqSecured));
      },
      err => reject(err),
    );
  });
}
