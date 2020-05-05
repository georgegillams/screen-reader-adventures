import { datumLoad } from '../datum';

import userDetailsAllowedAttributes from './private/userDetailsAllowedAttributes';

import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';
import { UNAUTHORISED_READ } from 'helpers/constants';

export default function loadAll(req) {
  const reqSecured = reqSecure(req, userDetailsAllowedAttributes);
  return new Promise((resolve, reject) => {
    authentication(reqSecured).then(
      user => {
        if (user && user.admin) {
          resolve(
            datumLoad({
              redisKey: 'userDetails',
              includeOwnerUname: true,
              includeDeleted: true,
            }),
          );
        } else {
          reject(UNAUTHORISED_READ);
        }
      },
      err => reject(err),
    );
  });
}
