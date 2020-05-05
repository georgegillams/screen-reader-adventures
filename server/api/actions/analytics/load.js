import { datumLoad } from '../datum';

import analyticsAllowedAttributes from './private/analyticsAllowedAttributes';

import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';
import { UNAUTHORISED_READ } from 'helpers/constants';

export default function load(req) {
  const reqSecured = reqSecure(req, analyticsAllowedAttributes);
  return new Promise((resolve, reject) => {
    authentication(reqSecured).then(
      user => {
        if (user && user.admin) {
          resolve(
            datumLoad({
              redisKey: 'analytics',
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
