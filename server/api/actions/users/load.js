import { datumLoad } from '../datum';

import usersAllowedAttributes from './private/usersAllowedAttributes';

import authentication from 'utils/authentication';
import { UNAUTHORISED_READ } from 'helpers/constants';
import reqSecure from 'utils/reqSecure';

export default function load(req) {
  const reqSecured = reqSecure(req, usersAllowedAttributes);
  return new Promise((resolve, reject) => {
    authentication(reqSecured).then(
      user => {
        if (user && user.admin) {
          resolve(datumLoad({ includeDeleted: true, redisKey: 'users' }));
        } else {
          reject(UNAUTHORISED_READ);
        }
      },
      err => reject(err),
    );
  });
}
